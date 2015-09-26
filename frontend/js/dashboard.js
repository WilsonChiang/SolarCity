"use strict";

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    var data = Server.getMoneySaved("house", new Date("2015-09-01").getTime(), Date.now());
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement(
        "div",
        { className: "box-wide" },
        React.createElement(LineGraph, {
          labels: data.times,
          data: [{ label: "House", data: data.results.house.data }, { label: "Average", data: data.results.average.data }] })
      ),
      React.createElement(
        "div",
        { className: "box" },
        React.createElement(BarGraph, {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          data: [{ label: "Win", data: [65, 59, 80, 81, 56, 55, 40] }] })
      ),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" }),
      React.createElement("div", { className: "box" })
    );
  }
});