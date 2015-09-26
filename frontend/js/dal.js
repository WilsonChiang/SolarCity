'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Server = (function () {
  var CONF = {
    baseURL: 'http://134.190.144.109:8081/api'
  };
  var TIME = {};

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
      value: function getMoneySaved(houseID, startDate, endDate, timeFrame) {
        return {
          house: {
            average: 123,
            data: this.randomTimeSeriesData(startDate, endDate, TIME[timeFrame], 100, 10)
          },

          average: {
            average: 123,
            data: this.randomTimeSeriesData(startDate, endDate, TIME[timeFrame], 100, 10)
          }
        };
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
          data.push({
            time: secs,
            value: val + Math.random() * varience
          });
        }
        return data;
      }
    }]);

    return DAL;
  })();

  return new DAL();
})();