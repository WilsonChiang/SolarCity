
var Dashboard = React.createClass({
  getInitialState: function () {
    setTimeout(() => {
      console.log('Loaded! (not really tho)')
      this.setState({ isLoaded: true });
    }, 1000 * 2);
    return {
      isLoaded: false
    };
  },

  onDateChange: function (data) {
    Server.getMoneySaved('WEL0754', data.startDate, data.endDate, data.timeStep.toLowerCase())
    .then(data => {
      this.setState({ isLoaded: true, data: data });
    });
  },

  getMoneySavedTimeSeries: function () {
    if (this.state.isLoaded) {
      return this.state.data;
    }
    return [];
  },

  render: function () {
    var labels;
    if (this.data) {
      labels = Server.getMonthlyLabels(this.data.startDate, this.data.endDate);
    } else {
      labels = [];
    }

    var lineGraph = (
      <LineGraph
        labels={labels}
        data={[
          {label: "House", data: this.getMoneySavedTimeSeries()}
        ]}/>
    );

    console.log('render');
    return (
      <div className="dashboard">
        <DateSelect onChange={this.onDateChange} />
        <div className="dashboard__boxes">
          <div className="box-wide">
            <Loader isLoaded={this.state.isLoaded} content={lineGraph} />
          </div>
          <div className="box">
            <BarGraph
            labels={["January", "February", "March", "April", "May", "June", "July"]}
            data={[{label:"Win", data:[65, 59, 80, 81, 56, 55, 40]}]} />
          </div>
          <div className="box"></div>
        </div>
      </div>
    );
  }
});



