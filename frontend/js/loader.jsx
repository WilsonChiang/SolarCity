
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
      <div className="u-fill-parent">
        <div style={{ display: this.props.isLoaded ? 'none' : 'block' }} className="loader"/>
        <div className="u-fill-parent" style={{ display: this.props.isLoaded ? 'inherit' : 'none' }}>
          {this.props.content}
        </div>
      </div>
    );
  }
});

