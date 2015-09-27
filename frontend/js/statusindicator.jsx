
var StatusIndicator = React.createClass({
  styles: {
    colors: [
      "#c0392b",
      "#2ecc71"
    ]
  },
  render: function () {
    var classString = 'indicator';
    if (this.props.enabled) {
      classString += ' indicator__enabled';
    }
    return (
      <div className="status-indicator">
        <div className={classString}></div>
        <h1 className="label">{this.props.label}</h1>
      </div>
    );
  }
});