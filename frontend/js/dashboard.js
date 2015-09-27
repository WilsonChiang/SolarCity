'use strict';

var Dashboard = React.createClass({
  displayName: 'Dashboard',

  getInitialState: function getInitialState() {
    return {
      isLoaded: false
    };
  },

  onDateChange: function onDateChange(dateInfo) {
    var self = this,
        startDate = dateInfo.startDate,
        endDate = dateInfo.endDate,
        timeStep = dateInfo.timeStep.toLowerCase();
    this.setState({
      isLoaded: false,
      startDate: startDate,
      endDate: endDate,
      timeStep: timeStep
    }, function () {
      if (timeStep == 'monthly' || timeStep == 'weekly') {
        timeStep = 'weekly';
      }
      Server.getMoneySaved('WEL0754', startDate, endDate, 'weekly').then(function (data) {
        console.log("Got server data", data);
        self.setState({ isLoaded: true, data: data });
      });
    });
  },

  getMoneySavedTimeSeries: function getMoneySavedTimeSeries() {
    if (this.state.isLoaded) {
      return this.state.data.home.costs.new_costs;
    }
    return [];
  },

  getBaseCostTimeSeries: function getBaseCostTimeSeries() {
    if (this.state.isLoaded) {
      return this.state.data.home.costs.base_costs;
    }
    return [];
  },

  getEmissionsTimeSeries: function getEmissionsTimeSeries() {
    if (this.state.isLoaded) {
      return this.state.data.home.emissions.new_emissions;
    }
    return '?';
  },

  getTotalMoneySaved: function getTotalMoneySaved() {
    var i,
        data,
        sum = 0;
    if (this.state.isLoaded) {
      data = this.getMoneySavedTimeSeries();
      for (i = 0; i < data.length; i++) {
        sum += Math.max(data[i], 0);
      }
      return '$' + Math.round(Math.floor(sum * 10) / 10);
    }
    return '?';
  },

  getTotalEmissionsReduced: function getTotalEmissionsReduced() {
    var i,
        data,
        sum = 0;
    if (this.state.isLoaded) {
      data = this.getEmissionsTimeSeries();
      for (i = 0; i < data.length; i++) {
        sum += data[i];
      }
      return Math.max(0, Math.round(Math.floor(sum * 1) / 10)) + 'kg';
    }
    return '?';
  },

  render: function render() {
    var labels;
    if (this.state.isLoaded) {
      labels = Server.getLabels(this.state.startDate, this.state.endDate);
    } else {
      labels = [];
    }

    var lineGraph = React.createElement(LineGraph, {
      labels: labels,
      data: [{
        label: "New Cost", data: this.getMoneySavedTimeSeries()
      }, {
        label: "Base Cost", data: this.getBaseCostTimeSeries()
      }]
    });

    var emissionsGraph = React.createElement(LineGraph, {
      labels: labels,
      data: [{
        label: "Emissions Reduced", data: this.getEmissionsTimeSeries()
      }]
    });

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
          React.createElement(
            'h2',
            { className: 'box-title' },
            'Cost ',
            React.createElement(
              'span',
              { style: { color: '#3498db' } },
              'with solar'
            ),
            ' vs ',
            React.createElement(
              'span',
              { style: { color: '#2ecc71' } },
              'without'
            )
          ),
          React.createElement(Loader, { isLoaded: this.state.isLoaded, content: lineGraph })
        ),
        React.createElement(
          'div',
          { className: 'box' },
          React.createElement(ValueSquare, { title: 'Total Savings',
            value: this.getTotalMoneySaved()
          })
        ),
        React.createElement(
          'div',
          { className: 'box' },
          React.createElement(ValueSquare, { title: 'Emissions Reduced', value: this.getTotalEmissionsReduced() })
        ),
        React.createElement(
          'div',
          { className: 'box-wide' },
          React.createElement(Loader, { isLoaded: this.state.isLoaded, content: emissionsGraph })
        ),
        React.createElement(
          'div',
          { className: 'box' },
          React.createElement(BarGraph, {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            data: [{ label: "Win", data: [65, 59, 80, 81, 56, 55, 40] }] })
        )
      )
    );
  }
});