var TIME = {};
TIME.second = 1000;
TIME.minute = TIME.second * 60;
TIME.hour = TIME.minute * 60;
TIME.day = TIME.hour * 24;
TIME.week = TIME.day * 7;
TIME.month = TIME.week * 4;
TIME.year = TIME.month * 12;
var DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var SHORT_DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

var SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

var Server = (function () {
  var CONF = {
    baseURL: 'http://104.197.183.223/api'
  };


  class DAL {
    get(url, data) {
      return new Promise(function (resolve, reject) {
        $.get(CONF.baseURL + url, data)
          .done(data => resolve(data))
          .error(err => reject(err));
      });
    }

    getHomes() {
      return this.get('/homes')
    }

    getMoneySaved(houseID, startDate, endDate, step) {
      return this.get([
        '/money',
        houseID,
        Math.round(+startDate / 1000),
        Math.round(+endDate / 1000),
        step
      ].join('/'))
    }

    getEnergyUsed(houseID, startDate, endDate) {
      return getMoneySaved(houseID, startDate, endDate);
    }

    randomTimeSeriesData(start, end, step, average, varience) {
      var secs, data = [], val = average;
      console.log(+start, +end, step);
      for (secs = +start; secs < +end; secs += step) {
        data.push(val);
        val += Math.round(((Math.random() * 2) - 1) * varience);
      }
      return data;
    }

    getMonthlyLabels(start, end, step) {
      var secs, data = [];
      for (secs = +start; secs < +end; secs += step) {
        data.push(days[new Date(secs).getDay()]);
      }
      return data;
    }

    getWeeklyLabels(start, end) {
      var secs, data = [];
      for (secs = +start; secs < +end; secs += TIME.day) {
        data.push(days[new Date(secs).getDay()]);
      }
      return data;
    }

    getMonthlyLabels(start, end) {
      var secs, data = [];
      for (secs = +start; secs < +end; secs += TIME.day) {
        var date = new Date(secs);
        data.push(
          SHORT_DAYS[date.getDay()] + ' ' + date.getDate()
        );
      }
      return data;
    }
  }

  return new DAL();
}());

