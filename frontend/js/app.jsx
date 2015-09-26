
var App = React.createClass({
  render: function () {
    return (
      <div className="app">
        <TitleBar />
        <div className="dashboard">
          <div className="box-wide foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
          <div className="box bar"></div>
          <div className="box foo"></div>
        </div>
      </div>
    )
  }
});

React.render(<App />, document.getElementsByClassName('app')[0]);

