"use strict";

var TitleBar = React.createClass({
  displayName: "TitleBar",

  render: function render() {
    return React.createElement(
      "nav",
      { className: "title-bar" },
      React.createElement(
        "ul",
        { className: "title-bar__items u-unselectable" },
        React.createElement(
          "li",
          { className: "title-bar__item" },
          "Dashboard"
        ),
        React.createElement(
          "li",
          { className: "title-bar__item" },
          "Settings"
        )
      )
    );
  }
});