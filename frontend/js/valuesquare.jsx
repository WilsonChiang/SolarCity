

var ValueSquare = React.createClass({
  render: function () {
    return (
      <div className="value-square">
        <h2 className="value-square__title">{ this.props.title }</h2>
        <div className="value-square__value">{ this.props.value }</div>
      </div>
    );
  }
});

