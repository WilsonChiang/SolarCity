'use strict';

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function getInitialState() {
    var _this = this;

    setTimeout(function () {
      console.log('Loaded! (not really tho)');
      _this.setState({ isLoaded: true });
    }, 1000 * 2);
    return {
      isLoaded: false
    };
  },

  onDateChange: function onDateChange(data) {
    var _this2 = this;

    Server.getMoneySaved('WEL0754', data.startDate, data.endDate, data.timeStep.toLowerCase()).then(function (data) {
      _this2.setState({ isLoaded: true, data: data });
    });
  },

  getMoneySavedTimeSeries: function getMoneySavedTimeSeries() {
    if (this.state.isLoaded) {
      return this.state.data;
    }
    return [];
  },

  render: function render() {
    var labels;
    if (this.data) {
      labels = Server.getMonthlyLabels(this.data.startDate, this.data.endDate);
    } else {
      labels = [];
    }

    var lineGraph = React.createElement(LineGraph, {
      labels: labels,
      data: [{ label: "House", data: this.getMoneySavedTimeSeries() }] });

    console.log('render');
    return React.createElement(
      'div',
      { className: 'dashboard' },
      React.createElement(DateSelect, { onChange: this.onDateChange }),
      React.createElement(
        'div',
        { className: 'dashboard__boxes' },
        React.createElement(
          'div',
          { className: 'box-wide' },
          React.createElement(Loader, { isLoaded: this.state.isLoaded, content: lineGraph })
        ),
        React.createElement(
          'div',
          { className: 'box' },
          React.createElement(BarGraph, {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            data: [{ label: "Win", data: [65, 59, 80, 81, 56, 55, 40] }] })
        ),
        React.createElement('div', { className: 'box' })
      )
    );
  }
});