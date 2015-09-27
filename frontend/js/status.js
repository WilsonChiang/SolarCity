'use strict';

var Status = React.createClass({
  displayName: 'Status',

  getInitialState: function getInitialState() {
    return { home: {},
      status: {
        led_pump_on: 0,
        led_t_coll_hi: 1,
        led_t_stor_hi: 1,
        led_delt_lo: 1
      }
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    Server.getHome('3').then(function (data) {
      _this.setState({ home: data });
    });
    Server.getHomeSystemStatus('WEL0754').then(function (data) {
      _this.setState({ status: data[0] });
    });
  },

  alert: function alert() {
    Server.sendAlert();
  },

  render: function render() {

    var home = this.state.home;
    var status = this.state.status;
    return React.createElement(
      'div',
      { className: 'dashboard' },
      React.createElement(
        'h1',
        null,
        'Home System Status'
      ),
      React.createElement(
        'div',
        { className: 'dashboard__boxes' },
        React.createElement(
          'div',
          { className: 'box-wide' },
          React.createElement(StatusIndicator, { label: 'Pump on', enabled: status.led_pump_on }),
          React.createElement(StatusIndicator, { label: 'Collector Temp HI', enabled: !status.led_t_coll_hi }),
          React.createElement(StatusIndicator, { label: 'Storage Temp HI', enabled: !status.led_t_stor_hi }),
          React.createElement(StatusIndicator, { label: 'Low Delta-T', enabled: !status.led_delt_lo })
        ),
        React.createElement(
          'div',
          { className: 'box home-info' },
          React.createElement(
            'h1',
            null,
            home.wel_address
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'label' },
              'Conventional System:'
            ),
            React.createElement(
              'div',
              null,
              home.conventional_system
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'label' },
              'Size of home:'
            ),
            React.createElement(
              'div',
              null,
              home.size_of_home,
              ' sq/ft'
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'label' },
              'Age of home:'
            ),
            React.createElement(
              'div',
              null,
              home.age_of_home,
              ' years'
            )
          ),
          React.createElement(
            'div',
            { style: { "text-align": "center", "margin-top": "10px" } },
            React.createElement(
              'button',
              { className: 'button', onClick: this.alert },
              'Enable Alerts'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'box-wide-tall' },
          React.createElement(Map, { query: home.postal_code })
        )
      )
    );
  }
});