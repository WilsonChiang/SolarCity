
var Map = React.createClass({
  render: function () {
    var url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCWInd_7L5WfJhzrLMTIdnRhSQLuzd1BrA";
    url += '&q=' + this.props.query;
    return (
      <iframe width="100%" height="100%" frameborder="0" style={{border:0}}
        src={url} allowfullscreen>
      </iframe>
    );
  }
});