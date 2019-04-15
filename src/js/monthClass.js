const moment = require('moment');

moment.locale('ru');

export default class Month {
  constructor(add) {
    this.year = 0;
    this.monthName = '';
    this.monthNumber = 0;
    this.dayNumber = 0;
    this.dayName = '';
    this.firstDayNumberInWeek = 0;
    this.lastDayNumberInMonth = 0;
    this.add = add;
  }

  descript() {
    this.year = Number(moment().add(this.add, 'month').format('YYYY'));
    this.monthName = moment().add(this.add, 'month').format('MMMM');
    this.monthNumber = Number(moment().add(this.add, 'month').format('M'));
    this.dayNumber = Number(moment().add(this.add, 'month').format('D'));
    this.dayName = moment().add(this.add, 'month').format('dddd');
    this.firstDayNumberInWeek = Number(moment([this.year, (this.monthNumber - 1), 1]).format('d'));
    this.lastDay();
  }

  lastDay() {
    for (let i = 31; i >= 28; i -= 1) {
      if (moment([this.year, (this.monthNumber - 1), i]).add(this.add, 'month').isValid() === true) {
        this.lastDayNumberInMonth = Number(moment([this.year, (this.monthNumber - 1), i]).format('DD'));
        break;
      }
    }
  }
}
