"use strict";

var Badges = React.createClass({
  displayName: "Badges",

  render: function render() {
    return React.createElement(
      "div",
      { className: "dashboard" },
      React.createElement(
        "div",
        { className: "dashboard__boxes" },
        React.createElement(
          "div",
          { className: "box" },
          React.createElement("img", { style: { width: "100%", height: "100%" }, src: "images/10_kg.png" })
        ),
        React.createElement(
          "div",
          { className: "box" },
          React.createElement("img", { style: { width: "100%", height: "100%", "-webkit-filter": "grayscale(100%)" }, src: "images/100_saved.png" })
        ),
        React.createElement(
          "div",
          { className: "box" },
          React.createElement("img", { style: { width: "100%", height: "100%" }, src: "images/going_green.png" })
        )
      )
    );
  }
});