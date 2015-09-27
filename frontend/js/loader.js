"use strict";

var Loader = React.createClass({
  displayName: "Loader",

  getInitialState: function getInitialState() {
    console.log('Initial state!');
    return {};
  },

  getLoader: function getLoader() {
    return React.createElement("img", { src: "loader.svg" });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "u-fill-parent" },
      React.createElement("div", { style: { display: this.props.isLoaded ? 'none' : 'block' }, className: "loader" }),
      React.createElement(
        "div",
        { className: "u-fill-parent", style: { display: this.props.isLoaded ? 'inherit' : 'none' } },
        this.props.content
      )
    );
  }
});