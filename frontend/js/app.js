'use strict';

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'h1',
      null,
      'We did it Reddit!'
    );
  }
});

React.render(React.createElement(App, null), document.getElementById('app'));