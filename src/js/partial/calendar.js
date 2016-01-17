'use strict';

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

  this.render = (year, month) => {
    /**
     * Когда таблица готова, в ней расставляются события на соответствующие даты
     * @param  {[type]} this.jsonFileUrl [description]
     * @param  {[type]} (item)           [description]
     * @return {[type]}                  [description]
     */
    this.getjson(this.jsonFileUrl, (item) => {
      let key = null;

      for (key in item) {
        if (item.hasOwnProperty(key)) {
          // if has event add class
          const itemTitle = '[data-id="' + item[key] + '"]';
          const $item = this.componentObj.find(itemTitle);

          if ($item) {
            if (_super.isAdmin) {
               // если admin, то присваиваем редактируемый класс
              $item.addClass('days_cal--inner_selected');
            } else {
              $item.addClass('days_cal--event');
              $item.off('click');
            }
          }
        }
      }

      // Отрисовка выделенных пользователем элементов при перезагрузке календаря
      // Проверяем, есть ли такие
      if (!$.isEmptyObject(_super.DATA)) {
        _super.DATA.forEach((item) => {
          const itemTitle = '[data-id="' + item + '"]';
          const $item = this.componentObj.find(itemTitle);
          $item.addClass('days_cal--inner_selected');
        });
      }
    });

    /*
    vars
     */
    const Calendar = new Date(year, month, 1);
    const D1Nfirst = Calendar.getDay(); // день недели первого дня месяца
    const day_of_week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const month_of_year = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
      'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    let html = null;
    let week_day = null;
    let day = null;
    const info = [];

    /*
    Calendar body
     */
    html = '<table class="table_calendar">';
    html += '<thead>';
    html += '<tr class="head_cal">';
    html += '<th><button class="btn btn--add btn--add-lg js-prevYear"><span class="fa fa-arrow-circle-left"></button></th>';
    html += '<th colspan="5"></span>' + month_of_year[month] + ', ' + year + '</th>';
    html += '<th><button class="btn btn--add btn--add-lg js-nextYear"><span class="fa fa-arrow-circle-right"></button></th></tr>';
    html += '<tr class="week_cal">';

    for (let index = 0; index < 7; index++) {
      html += '<th>' + day_of_week[index] + '</th>';
    }

    html += '</tr>';
    html += '</thead>';
    html += '<tbody class="days_cal">';
    html += '</tr>';

    if (D1Nfirst !== 0) {
      for (let index = 1; index < D1Nfirst; index++) {
        html += '<td class="white_cal"></td>';
      }
    } else { // если первый день месяца выпадает на воскресенье, то требуется 6 пустых клеток
      for (let index = 0; index < 6; index++) {
        html += '<td class="white_cal"></td>';
      }
    }

    for (let index = 0; index < 31; index++) {
      if (Calendar.getDate() > index) {
        week_day = Calendar.getDay();
        if (week_day !== 7) {
          day = Calendar.getDate();
          info.push('' + day + (Calendar.getMonth() + 1) + Calendar.getFullYear());
          html += '<td><span class="days_cal--inner" data-id="' + info[index] + '">' + day + '</span></td>';
        }
        if (week_day === 0) {
          html += '</tr>';
        }
      }
      Calendar.setDate(Calendar.getDate() + 1);
    }

    this.componentObj.html(html);

    info.forEach((item) => {
      const selectorName = '[data-id="' + item + '"]';
      this.componentObj.find(selectorName).on('click', () => {
        this.bookDay(item);
      });
    });

    this.componentObj.find('.js-prevYear').on('click', () => {
      this.navigationController('prev');
    });
    this.componentObj.find('.js-nextYear').on('click', () => {
      this.navigationController('next');
    });
  };

  this.bookDay = (date) => {
    let index = -1;

    this.componentObj.find('[data-id="' + date + '"]').toggleClass('days_cal--inner_selected');

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

  //   Get Json data
  this.getjson = (url, callback) => {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          const data = JSON.parse(ajax.responseText);
          return callback(data);
        }
      }
    };
    ajax.send();
  };

  /**
   * Return calendar booked days
   * @return {Array} booked days
   */
  this.getItems = () => {
    const items = [];
    let idkey;

    for (idkey in this.DATA) {
      if (this.DATA.hasOwnProperty(idkey)) {
        items.push(this.DATA[idkey]);
      }
    }
    return items;
  };

  /**
   * Remove calendar's booked days
   */
  this.clearData = () => {
    this.DATA = {};
    localStorage.removeItem(this.componentID);
  };
}
