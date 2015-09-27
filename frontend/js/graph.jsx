var GraphMixin = {
  colors: [
    'rgba(52, 152, 219, 0.75)', // Blue
    'rgba(39, 174, 96, 0.75)'   // Green
  ],

  getInitialState: function () {
    return {
      nextColor: 0
    }
  },

  getParams: function(labels, data) {
    var options = {
      responsive: true,
      maintainAspectRatio: false,
      scaleShowGridLines: false,
      pointDot: false,
      showTooltips: false,
      animation: false
    };
    var defaultDataSet = {
      label: "Default Label",
      fillColor: "rgba(39, 174, 96, 0.5)",
      buzierCurve: false,
      strokeColor: "rgba(0,0,0,0)",
      data: []
    };
    var graphData = {
      labels: labels,
      datasets: []
    };

    var self = this;
    $.each(this.props.data, function(index, element) {
      var dataset = $.extend({}, defaultDataSet);
      dataset.fillColor = self.colors[index % self.colors.length];
      graphData.datasets.push($.extend(dataset, element))
    });

    // More natural: first is in front, with others behind
    graphData.datasets = graphData.datasets.reverse();

    return {data: graphData, options: options}
  }
};

var LineGraph = React.createClass({
  mixins: [GraphMixin],
  componentDidMount: function () {
    this.reloadChart();
  },

  reloadChart: function() {
    var params = this.getParams(this.props.labels, this.props.data);
    var chart = React.findDOMNode(this.refs.chart);
    this.chart = new Chart(chart.getContext('2d')).Line(params.data, params.options)
  },

  componentDidUpdate: function () {
    this.reloadChart();
  },

  render: function() {
    return (
      // Wrap in div so that padding on parent doesn't break size.
      <div className="chart">
        <canvas ref="chart"></canvas>
      </div>
    )
  }
});

var BarGraph = React.createClass({
  mixins: [GraphMixin],
  componentDidMount: function() {
    var params = this.getParams(this.props.labels, this.props.data);
    this.chart = new Chart($('.bar-chart').get(0).getContext('2d')).Bar(params.data, params.options);
  },
  render: function() {
    return(
      // Wrap in div so that padding on parent doesn't break size.
      <div className="chart">
        <canvas className="bar-chart"></canvas>
      </div>
    );
  }
});
