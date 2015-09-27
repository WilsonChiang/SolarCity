
var App = React.createClass({
  main: function () {
    if (this.props.children) {
      return this.props.children;
    } else {
      return <Dashboard />
    }
  },

  render: function () {
    return (
      <div className="app">
        <TitleBar />
        {this.main()}
      </div>
    );
  }
});

var Link = ReactRouter.Link,
  Router = ReactRouter.Router,
  Route = ReactRouter.Route;

React.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="status" component={Status} />
    </Route>
    <Route path="*" component={FourOhFour} />
  </Router>,
  document.getElementsByClassName('app')[0]
);

