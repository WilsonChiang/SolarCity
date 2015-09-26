"use strict";

var App = React.createClass({
  displayName: "App",

  main: function main() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return React.createElement(Dashboard, null);
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(TitleBar, null),
      this.main()
    );
  }
});

var Link = ReactRouter.Link,
    Router = ReactRouter.Router,
    Route = ReactRouter.Route;

React.render(React.createElement(
  Router,
  null,
  React.createElement(
    Route,
    { path: "/", component: App },
    React.createElement(Route, { path: "more-info", component: MoreInfo })
  ),
  React.createElement(Route, { path: "*", component: FourOhFour })
), document.getElementsByClassName('app')[0]);