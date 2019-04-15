export default class Calendar {
  constructor(div, month) {
    this.parent = div;
    this.month = month;
    this.calendarDiv = 0;
    this.active = [];
  }

  create() {
    this.calendarDiv = document.createElement('div');
    this.calendarDiv.setAttribute('class', 'calendarDiv');
    this.parent.appendChild(this.calendarDiv);
    this.name();
    this.table();
  }

  name() {
    const name = document.createElement('div');
    name.innerHTML = `${this.month.monthName}, ${this.month.year}`;
    this.calendarDiv.appendChild(name);
  }

  weekDay(monthTable) {
    const week = document.createElement('tr');
    monthTable.appendChild(week);
    for (let j = 0; j < 7; j += 1) {
      const day = document.createElement('th');
      (j === 0) && (day.innerHTML = 'Пн');
      (j === 1) && (day.innerHTML = 'Вт');
      (j === 2) && (day.innerHTML = 'Ср');
      (j === 3) && (day.innerHTML = 'Чт');
      (j === 4) && (day.innerHTML = 'Пт');
      (j === 5) && (day.innerHTML = 'Сб');
      (j === 6) && (day.innerHTML = 'Вс');
      week.appendChild(day);
    }
  }

  table() {
    const monthTable = document.createElement('table');
    this.calendarDiv.appendChild(monthTable);
    this.weekDay(monthTable);
    let id = 1;
    for (let i = 0; i < 6; i += 1) {
      const week = document.createElement('tr');
      monthTable.appendChild(week);
      for (let j = 0; j < 7; j += 1) {
        const day = document.createElement('th');
        week.appendChild(day);
        day.setAttribute('data-id', `id${id}`);
        id += 1;
      }
    }
    this.tableInner();
  }

  tableInner() {
    for (let i = 1; i <= 42; i += 1) {
      const id = `id${i}`;
      const cell = this.parent.querySelector(`[data-id = ${id}]`);

      if ((i >= this.month.firstDayNumberInWeek) && (i < (this.month.lastDayNumberInMonth + this.month.firstDayNumberInWeek))) {
        cell.innerHTML = i - this.month.firstDayNumberInWeek + 1;
        if (((i - this.month.firstDayNumberInWeek + 1) === this.month.dayNumber) && (this.month.add === 0)) {
          cell.setAttribute('class', 'today');
          this.active.push(cell);
        } else if (((i - this.month.firstDayNumberInWeek + 1) < this.month.dayNumber) && (this.month.add === 0)) {
          cell.setAttribute('class', 'notActive');
        } else if (this.month.add < 0) {
          cell.setAttribute('class', 'notActive');
        } else {
          cell.setAttribute('class', 'active');
          this.active.push(cell);
        }
      }
    }
  }
}
