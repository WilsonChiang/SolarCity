"use strict";

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement("div", { className: "box-wide foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" }),
      React.createElement("div", { className: "box bar" }),
      React.createElement("div", { className: "box foo" })
    );
  }
});