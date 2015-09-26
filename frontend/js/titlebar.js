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
          "Dashboard"
        )
      ),
      React.createElement(
        Link,
        { to: "/more-info" },
        React.createElement(
          "span",
          { className: "title-bar__item" },
          "More Info"
        )
      )
    );
  }
});