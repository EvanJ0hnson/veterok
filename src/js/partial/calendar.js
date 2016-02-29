/**
 * Calendar module
 */
import * as _u from './lib/utilites';
import hbsCalendar from '../../templates/calendar.hbs';

export default function WICalendar(obj) {
  const _super = this;
  this.objName = obj;
  this.componentObj = null;
  this.componentID = null;
  this.year = null;
  this.month = null;
  this.jsonFileUrl = null;
  this.DATA = null;
  this.isAdmin = false;

  /**
   * Init Calendar
   * @param  {String}  componentID ID of the Calendar
   * @param  {String}  jsonFileUrl Path to JSON file with booked days
   * @param  {Boolean} isAdmin     Is user Admin or not
   */
  this.initObject = (componentID, jsonFileUrl, isAdmin) => {
    this.jsonFileUrl = jsonFileUrl;
    this.isAdmin = isAdmin;
    this.componentID = componentID;
    this.componentObj = $('#' + componentID);

    const Calendar = new Date();
    this.year = Calendar.getFullYear();
    this.month = Calendar.getMonth();
    this.render(this.year, this.month);

    this.DATA = JSON.parse(localStorage.getItem(componentID)) || [];

    /**
     * Draw border around previously selected elements
     * @param  {Array} !$.isEmptyObject(_super.DATA) Previously selected elements
     */
    if (!$.isEmptyObject(_super.DATA)) {
      _super.DATA.forEach((item) => {
        const itemSelector = '[data-id="' + item + '"]';
        const $item = this.componentObj.find(itemSelector);
        $item.addClass('calendar__days--selected');
      });
    }

    if (this.isAdmin) {
      $.getJSON(this.jsonFileUrl, (json) => {
        const tmpData = [];
        $.each(json, (key, val) => {
          tmpData.push(val);
        });
        _super.DATA = tmpData;
        localStorage.setItem(_super.componentID, JSON.stringify(_super.DATA));
      });
    }
  };

  /**
   * Navigate through month and years
   * @param  {String} direction Forward or backward
   */
  this.navigationController = (direction) => {
    switch (direction) {
      case 'next':
        this.month++;
        if (this.month === 12) {
          this.year++;
          this.month = 0;
        }
        break;
      case 'prev':
        this.month--;
        if (this.month === -1) {
          this.year--;
          this.month = 11;
        }
        break;
      default:
        break;
    }

    this.render(this.year, this.month);
  };

  /**
   * Create and render Calendar
   * @param  {String} year  Year
   * @param  {String} month Month
   */
  this.render = (year, month) => {
    const DAY_NAMES = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
      'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const date = new Date(year, month, 1);

    const firstDayOfMonth = date.getDay();
    const emptyDaysCount = (firstDayOfMonth !== 0) ? (firstDayOfMonth - 1) : 6;

    const days = [];
    let week = [];

    /**
     * Calendar's empty days
     */
    for (let i = 0; i < emptyDaysCount; i++) {
      week.push('');
    }

    /**
     * Calendar's main structure
     */
    for (let i = 0; i < 31; i++) {
      const day = {
        number: null,
        fullDate: null,
      };
      day.number = date.getDate();

      if (day.number > i) {
        day.fullDate = '' + day.number + '.' + (month + 1) + '.' + year;
        week.push(day);
      }

      if ((date.getDay() === 0) || (i === 30)) {
        days.push(week);
        week = [];
      }

      date.setDate(day.number + 1);
    }

    /**
     * Apply Handlebars template
     */
    this.componentObj.html(hbsCalendar({
      DAY_NAMES,
      month: MONTH_NAMES[month],
      year,
      days,
    }));

    /**
     * Draw border around previously selected elements
     * @param  {Array} !$.isEmptyObject(_super.DATA) Previously selected elements
     */
    if (!$.isEmptyObject(_super.DATA)) {
      _super.DATA.forEach((item) => {
        const itemSelector = '[data-id="' + item + '"]';
        const $item = this.componentObj.find(itemSelector);
        $item.addClass('calendar__days--selected');
      });
    }

    /**
     * Add eventListener to all days
     * @param  {Array} (weeks) Each week
     */
    days.forEach((weeks) => {
      weeks.forEach((day) => {
        const selectorName = '[data-id="' + day.fullDate + '"]';
        this.componentObj.find(selectorName).on('click', () => {
          this.bookDay(day.fullDate);
        });
      });
    });

    /**
     * Add eventListener to the Next month button
     */
    this.componentObj.find('.js-prevYear').on('click', () => {
      this.navigationController('prev');
    });

    /**
     * Add eventListener to the Next month button
     */
    this.componentObj.find('.js-nextYear').on('click', () => {
      this.navigationController('next');
    });

    /**
     * Mark already booked days
     * @param  {String} this.jsonFileUrl Path to the JSON file
     * @param  {JSON} (json)            JSON with booked days
     */
    _u.getJSON(this.jsonFileUrl, (json) => {
      const items = JSON.parse(json);
      let key = null;

      for (key in items) {
        if (items.hasOwnProperty(key)) {
          const itemTitle = '[data-id="' + items[key] + '"]';
          const $item = this.componentObj.find(itemTitle);

          if (_super.isAdmin) {
            $item.addClass('calendar__days--selected');
          } else {
            $item.addClass('calendar__days--booked');
            $item.off('click');
          }
        }
      }
    });
  };

  /**
   * Book day
   * @param  {String} date Date ID
   */
  this.bookDay = (date) => {
    let index = -1;

    this.componentObj.find('[data-id="' + date + '"]').toggleClass('calendar__days--selected');

    this.DATA.forEach((el, ind) => {
      if (el === date) {
        index = ind;
      }
    });

    if (index >= 0) {
      this.DATA.splice(index, 1);
    } else {
      this.DATA.push(date);
    }

    localStorage.setItem(this.componentID, JSON.stringify(this.DATA));
  };

  /**
   * Return booked days
   * @return {Array} booked days
   */
  this.getItems = () => {
    return this.DATA;
  };

  /**
   * Clear booked days (in a browser)
   */
  this.clearData = () => {
    this.DATA = {};
    localStorage.removeItem(this.componentID);
  };
}
