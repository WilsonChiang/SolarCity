var TitleBar = React.createClass({
  render: function () {
    return (
      <nav className="title-bar">
        <Link to="/">
          <span className="title-bar__item">
            <i className="title-bar__icon icon-chart-bar"></i>
            Dashboard
          </span>
        </Link>
        <Link to="/more-info">
          <i className="title-bar__icon icon-doc-text"></i>
          <span className="title-bar__item">More Info</span>
        </Link>
      </nav>
    );
  }
});

