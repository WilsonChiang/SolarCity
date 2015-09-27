'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TIME = {};
TIME.second = 1000;
TIME.minute = TIME.second * 60;
TIME.hour = TIME.minute * 60;
TIME.day = TIME.hour * 24;
TIME.week = TIME.day * 7;
TIME.month = TIME.week * 4;
TIME.year = TIME.month * 12;
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var Server = (function () {
  var CONF = {
    baseURL: 'http://104.197.183.223/api'
  };

  var DAL = (function () {
    function DAL() {
      _classCallCheck(this, DAL);
    }

    _createClass(DAL, [{
      key: 'get',
      value: function get(url, data) {
        return new Promise(function (resolve, reject) {
          $.get(CONF.baseURL + url, data).done(function (data) {
            return resolve(data);
          }).error(function (err) {
            return reject(err);
          });
        });
      }
    }, {
      key: 'getHomes',
      value: function getHomes() {
        return this.get('/homes');
      }
    }, {
      key: 'getMoneySaved',
      value: function getMoneySaved(houseID, startDate, endDate, step) {
        return this.get(['/money', houseID, Math.round(+startDate / 1000), Math.round(+endDate / 1000), step].join('/'));
      }
    }, {
      key: 'getEnergyUsed',
      value: function getEnergyUsed(houseID, startDate, endDate) {
        return getMoneySaved(houseID, startDate, endDate);
      }
    }, {
      key: 'randomTimeSeriesData',
      value: function randomTimeSeriesData(start, end, step, average, varience) {
        var secs,
            data = [],
            val = average;
        console.log(+start, +end, step);
        for (secs = +start; secs < +end; secs += step) {
          data.push(val);
          val += Math.round((Math.random() * 2 - 1) * varience);
        }
        return data;
      }
    }, {
      key: 'getWeeklyLabels',
      value: function getWeeklyLabels(start, end) {
        var secs,
            data = [];
        for (secs = +start; secs < +end; secs += TIME.day) {
          data.push(days[new Date(secs).getDay()]);
        }
        return data;
      }
    }, {
      key: 'getLabels',
      value: function getLabels(start, end) {
        var startTime = +start,
            endTime = +end,
            delta = endTime - startTime,
            labels = [],
            step = TIME.week,
            i;
        // Month
        if (endTime - startTime <= TIME.week) {
          step = TIME.day;
        }
        for (i = startTime; i < endTime; i += step) {
          var date = new Date(i);
          labels.push(SHORT_MONTHS[date.getMonth()] + ' ' + date.getDate());
        }
        return labels;
      }
    }]);

    return DAL;
  })();

  return new DAL();
})();