var TitleBar = React.createClass({
  render: function () {
    return (
      <nav className="title-bar">
        <Link to="/">
          <span className="title-bar__item">Dashboard</span>
        </Link>
        <Link to="/more-info">
          <span className="title-bar__item">More Info</span>
        </Link>
      </nav>
    );
  }
});

