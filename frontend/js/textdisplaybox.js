"use strict";

var TextDisplayBox = React.createClass({
  displayName: "TextDisplayBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "text_display_box" },
      this.props.displayText
    );
  }
});