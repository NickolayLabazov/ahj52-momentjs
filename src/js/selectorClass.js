import Month from './monthClass.js';
import Calendar from './calendarClass.js';

export default class Selector {
  constructor(div) {
    this.parent = div;
    this.input = 0;
    this.button = 0;
    this.selectForm = 0;
    this.addMonth = 0;
    this.calendar = 0;
    this.thither = [];
    this.conv = [];
    this.month = 0;
    this.conversely = false;
    this.focus = '';
    this.chec = 0;
  }

  create() {
    this.parent.innerHTML = '<input data-id = "checkbox" type="checkbox" name="a" value="1417">Туда и обратно</input>';
    this.chec = this.parent.querySelector('[data-id = checkbox]');
    this.chec.setAttribute('class', 'chek'),
    this.selectForm = document.createElement('form');
    const label = document.createElement('label');
    this.input = document.createElement('input');
    this.input.setAttribute('class', 'input');

    this.button = document.createElement('button');
    this.parent.appendChild(this.selectForm);
    this.selectForm.appendChild(label);
    this.selectForm.appendChild(this.input);
    if (this.conversely) {
      this.inputConv = document.createElement('input');
      this.inputConv.setAttribute('class', 'inputConv');

      const labelConv = document.createElement('label');
      this.selectForm.appendChild(labelConv);
      labelConv.innerHTML = 'Обратно';
      this.selectForm.appendChild(this.inputConv);
    }
    this.selectForm.appendChild(this.button);
    this.selectForm.setAttribute('class', 'selectForm');
    label.innerHTML = 'Туда';
    this.button.innerHTML = 'Подтвердить';

    this.addListenerChek();
    this.addListenerButton();
    this.addListener();
  }

  calendarCreate(add, parent) {
    this.month = new Month(add);
    this.month.descript();
    this.calendar = new Calendar(parent, this.month);

    this.calendar.create();
    this.addListenerDay();


    if (this.focus === 'selectDateConv') {
      for (const cell of this.calendar.active) {
        if ((this.calendar.month.monthNumber < this.thither[1]) || ((this.calendar.month.monthNumber = this.thither[1]) && (cell.innerHTML < this.thither[2]))) {
          cell.classList.remove('active');
          cell.setAttribute('class', 'notActive');
        }
      }
    }
  }

  selectDate(style) {
    const selectDate = document.createElement('div');
    this.selectForm.appendChild(selectDate);
    selectDate.setAttribute('class', style);
    const up = document.createElement('div');
    const down = document.createElement('div');
    up.setAttribute('class', 'up');
    down.setAttribute('class', 'down');
    up.innerHTML = '&#187';
    down.innerHTML = '&#171';
    selectDate.appendChild(down);
    this.calendarCreate(this.addMonth, selectDate);


    selectDate.appendChild(up);
    this.addListenerUpDown();
  }

  removeCalend() {
    try {
      try {
        const remove = document.querySelector('.selectDate');
        this.selectForm.removeChild(remove);
      } catch (e) {
        const remove = document.querySelector('.selectDateConv');
        this.selectForm.removeChild(remove);
      }
    } catch (e) {}
  }

  addListener() {
    this.input.addEventListener('focus', () => {
      this.addMonth = 0;
      this.removeCalend();
      this.selectDate('selectDate');
      this.focus = 'selectDate';
    });

    if (this.conversely) {
      this.inputConv.addEventListener('focus', () => {
        this.addMonth = 0;
        this.removeCalend();
        this.focus = 'selectDateConv';
        this.selectDate(this.focus);
      });
    }
  }

  addListenerUpDown() {
    const up = document.querySelector('.up');
    const down = document.querySelector('.down');

    up.addEventListener('click', () => {
      const sf = document.querySelector('.selectForm');
      const sd = sf.querySelector(`.${this.focus}`);
      sf.removeChild(sd);
      this.addMonth += 1;
      this.selectDate(this.focus);
    });

    down.addEventListener('click', () => {
      const sf = document.querySelector('.selectForm');
      const sd = sf.querySelector(`.${this.focus}`);
      sf.removeChild(sd);
      this.addMonth -= 1;
      this.selectDate(this.focus);
    });
  }

  selectDay(form, arr, elem) {
    const selectForm = document.querySelector('.selectForm');
    const input = selectForm.querySelector(form);
    input.value = `${elem.innerHTML} ${this.month.monthName} ${this.month.year}`;
    arr = [this.month.year, this.month.monthNumber, Number(elem.innerHTML)];
    if (this.focus === 'selectDateConv') {
      this.conv = arr;
    } else { this.thither = arr; }


    this.removeCalend();
    console.log(arr);
    this.addMonth = 0;
  }

  addListenerDay() {
    for (const elem of this.calendar.active) {
      elem.addEventListener('click', () => {
        if (this.focus === 'selectDate') {
          this.selectDay('.input', this.thither, elem);
        } else {
          this.selectDay('.inputConv', this.conv, elem);
        }
      });
    }
  }


  addListenerButton() {
    this.button.addEventListener('click', () => {
      event.preventDefault();
      console.log(this.thither);
      console.log(this.conv);
    });
  }

  addListenerChek() {
    this.chec.addEventListener('click', () => {
      if (this.conversely) {
        this.conversely = false;
      } else { this.conversely = true; }
      this.create();
    });
  }
}
