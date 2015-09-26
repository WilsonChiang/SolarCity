var GraphMixin = {
  getParams: function(labels, data) {
    var options = {
      responsive: true,
      maintainAspectRatio: false
    };
    var defaultDataSet = {
      label: "Default Label",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: []
    };
    var graphData = {
      labels: labels,
      datasets: []
    };
    $.each(this.props.data, function(index, element) {
      var dataset = $.extend({}, defaultDataSet);
      graphData.datasets.push($.extend(dataset, element))
    });

    return {data: graphData, options: options}
  }
};

var LineGraph = React.createClass({
  mixins: [GraphMixin],
  componentDidMount: function() {
    var params = this.getParams(this.props.labels, this.props.data);
    this.chart = new Chart($('.line_chart').get(0).getContext('2d')).Line(params.data, params.options);
  },
  render: function() {
    return <canvas className="line_chart"></canvas>
  }
});

var BarGraph = React.createClass({
  mixins: [GraphMixin],
  componentDidMount: function() {
    var params = this.getParams(this.props.labels, this.props.data);
    this.chart = new Chart($('.bar_chart').get(0).getContext('2d')).Bar(params.data, params.options);
  },
  render: function() {
    return <canvas className="bar_chart"></canvas>
  }
});