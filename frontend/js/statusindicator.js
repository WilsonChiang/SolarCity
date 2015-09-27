"use strict";

var StatusIndicator = React.createClass({
  displayName: "StatusIndicator",

  styles: {
    colors: ["#c0392b", "#2ecc71"]
  },
  render: function render() {
    var classString = 'indicator';
    if (this.props.enabled) {
      classString += ' indicator__enabled';
    }
    return React.createElement(
      "div",
      { className: "status-indicator" },
      React.createElement("div", { className: classString }),
      React.createElement(
        "h1",
        { className: "label" },
        this.props.label
      )
    );
  }
});