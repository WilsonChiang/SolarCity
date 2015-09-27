"use strict";

var Status = React.createClass({
  displayName: "Status",

  render: function render() {
    var status = {
      "url": "http://localhost:8000/api/status/49094984/",
      "wel": "WEL0754",
      "sample_time": "2014-03-01T00:00:31Z",
      "aux_heat_on": 0.0,
      "flow_gly": 0.0,
      "flow_water": 0.0,
      "flow_water_d": 48.01,
      "heat_aux_d": 31.0,
      "pv_volts": 0.0,
      "pv_amps": 0.01,
      "solar_power": 0.0,
      "t_collector": 0.0,
      "t_storage": 24.5,
      "t_hx_gly_in": 27.6,
      "t_hx_gly_out": 25.5,
      "t_hx_water_out": 40.19,
      "t_water_cold": 19.5,
      "t_water_solar": 42.1,
      "t_water_hot": 55.98,
      "led_pump_on": 1,
      "led_t_coll_hi": 0,
      "led_t_stor_hi": 0,
      "led_delt_lo": 0,
      "created_at": null,
      "updated_at": null,
      "date": "2014-03-01",
      "time": "00:00:31"
    };
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement(
        "h1",
        null,
        "Home System Status"
      ),
      React.createElement(
        "div",
        { className: "dashboard__boxes" },
        React.createElement(
          "div",
          { className: "box-wide" },
          React.createElement(StatusIndicator, { label: "Pump on", enabled: status.led_pump_on }),
          React.createElement(StatusIndicator, { label: "Collector Temp HI", enabled: !status.led_t_coll_hi }),
          React.createElement(StatusIndicator, { label: "Storage Temp HI", enabled: !status.led_t_stor_hi }),
          React.createElement(StatusIndicator, { label: "Low Delta-T", enabled: !status.led_delt_lo })
        ),
        React.createElement("div", { className: "box" }),
        React.createElement("div", { className: "box" }),
        React.createElement("div", { className: "box-wide" })
      )
    );
  }
});