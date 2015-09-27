
var Dashboard = React.createClass({
  getInitialState: function () {
    return {
      isLoaded: false
    };
  },

  onDateChange: function (dateInfo) {
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
      Server.getMoneySaved('WEL0754', startDate, endDate, 'weekly')
      .then(data => {
        console.log("Got server data", data)
        self.setState({ isLoaded: true, data: data });
      });
    });
  },

  getMoneySavedTimeSeries: function () {
    if (this.state.isLoaded) {
      return this.state.data.home.costs.new_costs;
    }
    return [];
  },

  getBaseCostTimeSeries: function () {
    if (this.state.isLoaded) {
      return this.state.data.home.costs.base_costs;
    }
    return [];
  },

  getEmissionsTimeSeries: function () {
    if (this.state.isLoaded) {
      return this.state.data.home.emissions.new_emissions;
    }
    return '?';
  },

  getTotalMoneySaved: function () {
    var i, data, sum = 0;
    if (this.state.isLoaded) {
      data = this.getMoneySavedTimeSeries();
      for (i = 0; i < data.length; i++) {
        sum += Math.max(data[i], 0);
      }
      return '$' + Math.round(Math.floor(sum * 10) / 10);
    }
    return '?';
  },

  getTotalEmissionsReduced: function () {
    var i, data, sum = 0;
    if (this.state.isLoaded) {
      data = this.getEmissionsTimeSeries();
      for (i = 0; i < data.length; i++) {
        sum += data[i];
      }
      return Math.max(0, Math.round(Math.floor(sum * 1) / 10)) + 'kg';
    }
    return '?';
  },

  render: function () {
    var labels;
    if (this.state.isLoaded) {
      labels = Server.getLabels(this.state.startDate, this.state.endDate);
    } else {
      labels = [];
    }

    var lineGraph = (
      <LineGraph
        labels={labels}
        data={[{
          label: "New Cost", data: this.getMoneySavedTimeSeries()
        }, {
          label: "Base Cost", data: this.getBaseCostTimeSeries()
        }]}
        />
    );

    var emissionsGraph = (
      <LineGraph
        labels={labels}
        data={[{
          label: "Emissions Reduced", data: this.getEmissionsTimeSeries()
        }]}
        />
    );

    return (
      <div className="dashboard">
        <DateSelect onChange={this.onDateChange} />
        <div className="dashboard__boxes">
          <div className="box-wide">
            <h2 className="box-title">
              Cost <span style={{color: '#3498db'}}>with solar</span> vs <span style={{color: '#2ecc71'}}>without</span>
            </h2>
            <Loader isLoaded={this.state.isLoaded} content={lineGraph} />
          </div>
          <div className="box">
            <ValueSquare title="Total Savings" 
                         value={this.getTotalMoneySaved()}
                         />
          </div>
          <div className="box">
            <ValueSquare title="Emissions Reduced" value={this.getTotalEmissionsReduced()}/>
          </div>
          <div className="box-wide">
            <Loader isLoaded={this.state.isLoaded} content={emissionsGraph} />
          </div>
          <div className="box">
            <BarGraph
            labels={["January", "February", "March", "April", "May", "June", "July"]}
            data={[{label:"Win", data:[65, 59, 80, 81, 56, 55, 40]}]} />
          </div>
        </div>
      </div>
    );
  }
});

