"use strict";

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement(DateSelect, null),
      React.createElement(
        "div",
        { className: "dashboard__boxes" },
        React.createElement("div", { className: "box-wide" }),
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
        React.createElement("div", { className: "box" }),
        React.createElement("div", { className: "box" })
      )
    );
  }
});