"use strict";

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement(
        "div",
        { className: "box-wide" },
        React.createElement(LineGraph, {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          data: [{ label: "You", data: [65, 59, 80, 81, 56, 55, 40] }, { label: "Average", data: [60, 60, 65, 70, 60, 60, 50] }] })
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