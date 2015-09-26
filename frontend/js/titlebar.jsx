
var TitleBar = React.createClass({
  render: function () {
    return (
      <nav className="title-bar">
        <ul className="title-bar__items u-unselectable">
          <li className="title-bar__item">Dashboard</li>
          <li className="title-bar__item">Settings</li>
        </ul>
      </nav>
    );
  }
});

