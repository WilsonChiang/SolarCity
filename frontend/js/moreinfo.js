'use strict';

var MoreInfo = React.createClass({
  displayName: 'MoreInfo',

  render: function render() {
    console.log('render');
    return React.createElement(
      'h1',
      null,
      'More Info Page'
    );
  }
});