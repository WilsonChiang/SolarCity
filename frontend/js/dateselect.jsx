
var DateSelect = React.createClass({

  getInitialState: function () {
    return {
      timeStep: 'Monthly',
      stepsInPast: 6
    }
  },

  getStartDate: function () {
    var timeStep = this.state.timeStep,
      now = new Date(),
      stepsInPast = this.state.stepsInPast;
    switch (timeStep) {
      case 'Monthly':
        return new Date(
          now.getFullYear(),
          now.getMonth() - stepsInPast
        );
      case 'Weekly':
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - (stepsInPast * 7) - now.getDay()
        );
      case 'Daily':
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - stepsInPast
        );
      default:
        throw new Error('Invalid time step ' + timeStep)
    }
  },

  getEndDate: function () {
    var deltas = {},
      now = new Date(),
      stepsInPast = this.state.stepsInPast;
    if (this.state.stepsInPast == 0) {
      return new Date();
    } else {
      switch(this.state.timeStep) {
        case 'Monthly':
          return new Date(
            now.getFullYear(),
            (now.getMonth() - stepsInPast) + 1
          );
        case 'Weekly':
          return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - (7 * stepsInPast - 1)
          );
        case 'Daily':
          return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - (stepsInPast - 1)
          );
        default:
          throw new Error('Invalid time step ' + timeStep)
      }
    }
  },

  formatDate: function (date) {
    return MONTHS[date.getMonth()] + ' ' + date.getDate();
  },

  stepInPast: function (delta) {
    return (event) => {
      console.log(this.state.stepsInPast);
      this.setState({
        stepsInPast: Math.max(0, this.state.stepsInPast + delta)
      });
    }
  },

  onDropdownChange: function (event) {
    this.setState({
      timeStep: event.target.value,
      stepsInPast: 0
    });
  },

  timeStepDropdown: function () {
    return (
      <select onChange={this.onDropdownChange} 
          className="date-select__dropdown">
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
    )
  },

  timeLabel: function () {
    return [
        this.formatDate(this.getStartDate()),
        ' to ',
        this.formatDate(this.getEndDate()),
    ].join('')
  },

  render: function () {
    this.props.onChange({
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      timeStep: this.state.timeStep
    });
    return (
      <div className="date-select u-unselectable">
        <i onClick={this.stepInPast(1)} className="date-select__arrow icon-left-open-big"></i>
        <span className="date-select__text">
          {this.timeStepDropdown()}
          <span className="date-select__label">{this.timeLabel()}</span>
        </span>
        <i onClick={this.stepInPast(-1)} className="date-select__arrow icon-right-open-big"></i>
      </div>
    );
  }
});


