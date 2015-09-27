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
      null,
      React.createElement("div", { style: { opacity: this.props.isLoaded ? 0 : 1 }, className: "loader" }),
      React.createElement(
        "div",
        { style: { display: this.props.isLoaded ? 'inherit' : 'none' } },
        this.props.content
      )
    );
  }
});