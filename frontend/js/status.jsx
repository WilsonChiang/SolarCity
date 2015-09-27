
var Status = React.createClass({
  getInitialState: function () {
    return { home: {},
      status: {
        led_pump_on: 0,
        led_t_coll_hi: 1,
        led_t_stor_hi: 1,
        led_delt_lo: 1
      }
    };
  },

  componentDidMount: function() {
    Server.getHome('3').then(data => {
      this.setState({ home: data });
    });
    Server.getHomeSystemStatus('WEL0754').then(data => {
      this.setState({ status: data[0] });
    });
  },

  alert: function () {
    Server.sendAlert();
  },

  render: function () {

    var home = this.state.home;
    var status = this.state.status;
    return (
      <div className="dashboard">
        <h1>Home System Status</h1>
        <div className="dashboard__boxes">
          <div className="box-wide">
            <StatusIndicator label="Pump on" enabled={status.led_pump_on} />
            <StatusIndicator label="Collector Temp HI" enabled={!status.led_t_coll_hi} />
            <StatusIndicator label="Storage Temp HI" enabled={!status.led_t_stor_hi} />
            <StatusIndicator label="Low Delta-T" enabled={!status.led_delt_lo} />
          </div>
          <div className="box home-info">
            <h1>{home.wel_address}</h1>
            <div>
              <div className="label">Conventional System:</div>
              <div>{home.conventional_system}</div>
            </div>
            <div>
              <div className="label">Size of home:</div>
              <div>{home.size_of_home} sq/ft</div>
            </div>
            <div>
              <div className="label">Age of home:</div>
              <div>{home.age_of_home} years</div>
            </div>
            <div style={{"text-align":"center", "margin-top":"10px"}}>
              <button className="button" onClick={this.alert}>Enable Alerts</button>
            </div>
          </div>
          <div className="box-wide-tall">
            <Map query={home.postal_code} />
          </div>
        </div>
      </div>
    );
  }
});

