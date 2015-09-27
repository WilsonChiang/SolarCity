'use strict';

var DateSelect = React.createClass({
  displayName: 'DateSelect',

  getInitialState: function getInitialState() {
    return {
      timeStep: 'Monthly',
      stepsInPast: 6
    };
  },

  getStartDate: function getStartDate() {
    var timeStep = this.state.timeStep,
        now = new Date(),
        stepsInPast = this.state.stepsInPast;
    switch (timeStep) {
      case 'Monthly':
        return new Date(now.getFullYear(), now.getMonth() - stepsInPast);
      case 'Weekly':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - stepsInPast * 7 - now.getDay());
      case 'Daily':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - stepsInPast);
      default:
        throw new Error('Invalid time step ' + timeStep);
    }
  },

  getEndDate: function getEndDate() {
    var deltas = {},
        now = new Date(),
        stepsInPast = this.state.stepsInPast;
    if (this.state.stepsInPast == 0) {
      return new Date();
    } else {
      switch (this.state.timeStep) {
        case 'Monthly':
          return new Date(now.getFullYear(), now.getMonth() - stepsInPast + 1);
        case 'Weekly':
          return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (7 * stepsInPast - 1));
        case 'Daily':
          return new Date(now.getFullYear(), now.getMonth(), now.getDate() - (stepsInPast - 1));
        default:
          throw new Error('Invalid time step ' + timeStep);
      }
    }
  },

  formatDate: function formatDate(date) {
    return MONTHS[date.getMonth()] + ' ' + date.getDate();
  },

  stepInPast: function stepInPast(delta) {
    var _this = this;

    return function (event) {
      console.log(_this.state.stepsInPast);
      _this.setState({
        stepsInPast: Math.max(0, _this.state.stepsInPast + delta)
      });
    };
  },

  onDropdownChange: function onDropdownChange(event) {
    this.setState({
      timeStep: event.target.value,
      stepsInPast: 0
    });
  },

  timeStepDropdown: function timeStepDropdown() {
    return React.createElement(
      'select',
      { onChange: this.onDropdownChange,
        className: 'date-select__dropdown' },
      React.createElement(
        'option',
        { value: 'Daily' },
        'Daily'
      ),
      React.createElement(
        'option',
        { value: 'Weekly' },
        'Weekly'
      ),
      React.createElement(
        'option',
        { value: 'Monthly' },
        'Monthly'
      )
    );
  },

  timeLabel: function timeLabel() {
    return [this.formatDate(this.getStartDate()), ' to ', this.formatDate(this.getEndDate())].join('');
  },

  render: function render() {
    this.props.onChange({
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      timeStep: this.state.timeStep
    });
    return React.createElement(
      'div',
      { className: 'date-select u-unselectable' },
      React.createElement('i', { onClick: this.stepInPast(1), className: 'date-select__arrow icon-left-open-big' }),
      React.createElement(
        'span',
        { className: 'date-select__text' },
        this.timeStepDropdown(),
        React.createElement(
          'span',
          { className: 'date-select__label' },
          this.timeLabel()
        )
      ),
      React.createElement('i', { onClick: this.stepInPast(-1), className: 'date-select__arrow icon-right-open-big' })
    );
  }
});