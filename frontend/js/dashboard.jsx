
var Dashboard = React.createClass({
  render: function () {
    return (
      <div className="dashboard">
        <div className="box-wide">
          <LineGraph
            labels={["January", "February", "March", "April", "May", "June", "July"]}
            data={[
                {label: "You", data:[65, 59, 80, 81, 56, 55, 40]},
                {label: "Average", data:[60, 60, 65, 70, 60, 60, 50]}
              ]}/>
        </div>
        <div className="box">
          <BarGraph
            labels={["January", "February", "March", "April", "May", "June", "July"]}
            data={[{label:"Win", data:[65, 59, 80, 81, 56, 55, 40]}]} />
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    );
  }
});



