'use strict';

var DateSelect = React.createClass({
  displayName: 'DateSelect',

  pretendNow: new Date('March 15, 2015'),

  getInitialState: function getInitialState() {
    return {
      timeStep: 'Monthly',
      stepsInPast: 0
    };
  },

  componentDidMount: function componentDidMount() {
    this.runOnChange();
  },

  getStartDate: function getStartDate() {
    var timeStep = this.state.timeStep,
        now = this.pretendNow,
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
        now = this.pretendNow,
        stepsInPast = this.state.stepsInPast;
    if (this.state.stepsInPast == 0) {
      return now;
    } else {
      switch (this.state.timeStep) {
        case 'Monthly':
          return new Date(now.getFullYear(), now.getMonth() - stepsInPast + 1);
        case 'Weekly':
          return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 * (stepsInPast - 1));
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
      _this.setState({
        stepsInPast: Math.max(0, _this.state.stepsInPast + delta)
      }, _this.runOnChange);
    };
  },

  onDropdownChange: function onDropdownChange(event) {
    this.runOnChange();
    this.setState({
      timeStep: event.target.value,
      stepsInPast: 0
    });
  },

  runOnChange: function runOnChange() {
    this.props.onChange({
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      timeStep: this.state.timeStep
    });
  },

  timeStepDropdown: function timeStepDropdown() {
    return React.createElement(
      'select',
      { value: this.state.timeStep, onChange: this.onDropdownChange,
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