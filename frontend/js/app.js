"use strict";

var App = React.createClass({
  displayName: "App",

  render: function render() {
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(TitleBar, null),
      React.createElement(
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
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementsByClassName('app')[0]);