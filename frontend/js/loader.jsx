
var Loader = React.createClass({
  getInitialState: function () {
    console.log('Initial state!')
    return {};
  },

  getLoader: function () {
    return (
      <img src="loader.svg" />
    )
  },

  render: function () {
    return (
      <div>
        <div style={{ opacity: this.props.isLoaded ? 0 : 1}} className="loader"/>
        <div style={{ display: this.props.isLoaded ? 'inherit' : 'none' }}>
          {this.props.content}
        </div>
      </div>
    );
  }
});

