
var Badges = React.createClass({
  render: function () {
    return (
      <div className="dashboard">
        <div className="dashboard__boxes">
          <div className="box">
            <img style={{width:"100%", height:"100%"}} src="images/10_kg.png" />
          </div>
          <div className="box">
            <img style={{width:"100%", height:"100%", "-webkit-filter":"grayscale(100%)"}} src="images/100_saved.png" />
          </div>
          <div className="box">
            <img style={{width:"100%", height:"100%"}} src="images/going_green.png" />
          </div>
        </div>
      </div>
    );
  }
});