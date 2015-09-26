
var Dashboard = React.createClass({
  render: function () {
    var data = Server.getMoneySaved("house", new Date("2015-09-01").getTime(), Date.now());
    return (
      <div className="dashboard">
        <div className="box-wide">
          <LineGraph
            labels={data.times}
            data={[
                {label: "House", data:data.results.house.data},
                {label: "Average", data:data.results.average.data}
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



