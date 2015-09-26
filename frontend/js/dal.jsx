var Server = (function () {
  var CONF = {
    baseURL: 'http://134.190.144.109:8081/api'
  };
  var TIME = {};

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

    getMoneySaved(houseID, startDate, endDate, timeFrame) {
      return {
        house: {
          average: 123,
          data: this.randomTimeSeriesData(startDate, endDate, TIME[timeFrame], 100, 10)
        },

        average: {
          average: 123,
          data: this.randomTimeSeriesData(startDate, endDate, TIME[timeFrame], 100, 10)
        }
      }
    }

    getEnergyUsed(houseID, startDate, endDate) {
      return getMoneySaved(houseID, startDate, endDate);
    }

    randomTimeSeriesData(start, end, step, average, varience) {
      var secs, data = [], val = average;
      console.log(+start, +end, step);
      for (secs = +start; secs < +end; secs += step) {
        data.push({
          time: secs,
          value: val + (Math.random() * varience)
        });
      }
      return data;
    }
  }

  return new DAL();
}());

