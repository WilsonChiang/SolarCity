"use strict";

var ValueSquare = React.createClass({
  displayName: "ValueSquare",

  render: function render() {
    return React.createElement(
      "div",
      { className: "value-square" },
      React.createElement(
        "h2",
        { className: "value-square__title" },
        this.props.title
      ),
      React.createElement(
        "div",
        { className: "value-square__value" },
        this.props.value
      )
    );
  }
});