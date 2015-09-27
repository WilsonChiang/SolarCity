"use strict";

var TitleBar = React.createClass({
  displayName: "TitleBar",

  render: function render() {
    return React.createElement(
      "nav",
      { className: "title-bar" },
      React.createElement(
        Link,
        { to: "/" },
        React.createElement(
          "span",
          { className: "title-bar__item" },
          React.createElement("i", { className: "title-bar__icon icon-chart-bar" }),
          "Dashboard"
        )
      ),
      React.createElement(
        Link,
        { to: "/status" },
        React.createElement("i", { className: "title-bar__icon icon-doc-text" }),
        React.createElement(
          "span",
          { className: "title-bar__item" },
          "System Status"
        )
      ),
      React.createElement(
        Link,
        { to: "/badges" },
        React.createElement("i", { className: "title-bar__icon icon-user" }),
        React.createElement(
          "span",
          { className: "title-bar__item" },
          "Badges"
        )
      )
    );
  }
});