'use strict';

function WICalendar(obj) {
  this.objName = obj;
  this.componentObj = null;
  this.componentID = null;
  this.year = null;
  this.month = null;
  this.jsonFileUrl = null;
  this.DATA = null;
  this.isAdmin = null;
  var _super = this;

  this.initObject = function(componentID, jsonFileUrl, isAdmin) {
    this.jsonFileUrl = jsonFileUrl;
    this.isAdmin = isAdmin;
    this.componentID = componentID;
    this.componentObj = $('#' + componentID);

    var Calendar = new Date();
    this.year = Calendar.getFullYear();
    this.month = Calendar.getMonth();
    this.render(this.year, this.month);

    this.DATA = JSON.parse(localStorage.getItem(componentID)) || [];

    if (this.isAdmin) {
      // admin
      // Тут происходит магия с сохранением контекста через
      // переменную _super.
      // _super.DATA == this.DATA
      // Нужно получше разобраться
      $.getJSON(this.jsonFileUrl, function(json) {
        var tmpData = [];
        $.each(json, function(key, val) {
          tmpData.push(val);
        });
        _super.DATA = tmpData;
        localStorage.setItem(_super.componentID, JSON.stringify(_super.DATA));
      });
    }
  };

  this.navigationController = function(direction) {
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

  this.render = function(year, month) {
    // get json
    // после загрузки файла выполняется основной код
    // Когда таблица готова, в ней расставляются события на соответствующие даты
    this.getjson(this.jsonFileUrl, function(obj) {
      var key = null;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          // if has envent add class
          if (_super.isAdmin) {
            // если admin, то присваиваем редактируемый класс
            if ($('#' + _super.componentID + ' [data-id="' + obj[key] + '"]')) {
              $('#' + _super.componentID + ' [data-id="' + obj[key] + '"]').addClass('days_cal--inner_selected');
            }
          } else {
            if ($('#' + _super.componentID + ' [data-id="' + obj[key] + '"]')) {
              $('#' + _super.componentID + ' [data-id="' + obj[key] + '"]').attr('onclick', '');
              $('#' + _super.componentID + ' [data-id="' + obj[key] + '"]').addClass('days_cal--event');
            }
          }
        }
      }
      // Отрисовка выделенных пользователем элементов при перезагрузке календаря
      // Проверяем, есть ли такие
      if (!$.isEmptyObject(_super.DATA)) {
        _super.DATA.forEach(function(el, ind, arr) {
          $('#' + _super.componentID + ' [data-id="' + arr[ind] + '"]').addClass('days_cal--inner_selected');
        });
      }
    });

    // vars
    var
      Calendar = new Date(),
      day_of_week = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
      month_of_year = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      html = null,
      week_day = null,
      day = null,
      info = null,
      index = null,
      D1Nfirst = new Date(year, month, 1).getDay(); // день недели первого дня месяца

    Calendar.setDate(1);
    Calendar.setYear(year);
    Calendar.setMonth(month);

    // head
    html = '<table class="table_calendar">';
    html += '<thead>';
    html += '<tr class="head_cal"> \
    <th><button class="btn btn--add btn--add-lg" onclick="' + this.objName + '.navigationController(\'prev\')"><span class="fa fa-arrow-circle-left"></button></th> \
    <th colspan="5"></span>' + month_of_year[month] + ', ' + year + '</th> \
    <th><button class="btn btn--add btn--add-lg" onclick="' + this.objName + '.navigationController(\'next\')"><span class="fa fa-arrow-circle-right"></button></th></tr>';
    html += '<tr class="week_cal">';
    //Weekdays

    for (index = 0; index < 7; index++) {
      html += '<th>' + day_of_week[index] + '</th>';
    }

    html += '</tr>';
    html += '</thead>';

    // body
    html += '<tbody class="days_cal">';
    html += '</tr>';
    // white zone
    if (D1Nfirst !== 0) {
      for (index = 1; index < D1Nfirst; index++) {
        html += '<td class="white_cal"></td>';
      }
    } else { // если первый день месяца выпадает на воскресенье, то требуется 6 пустых клеток
      for (index = 0; index < 6; index++) {
        html += '<td class="white_cal"></td>';
      }
    }

    for (index = 0; index < 31; index++) {
      if (Calendar.getDate() > index) {
        week_day = Calendar.getDay();
        if (week_day !== 7) {
          // this day
          day = Calendar.getDate();
          info = day + '.' + (Calendar.getMonth() + 1) + '.' + Calendar.getFullYear();
          html += '<td><span class="days_cal--inner js-bookDay" data-id="' + info + '" onclick="' + this.objName + '.bookDay(\'' + info + '\')">' + day + '</span></td>';
        }
        if (week_day === 0) {
          html += '</tr>';
        }
      }
      Calendar.setDate(Calendar.getDate() + 1);
    } // end for loop

    this.componentObj.html(html);
  };

  this.bookDay = function(date) {
    var index = -1;

    this.DATA.forEach(function(el, ind, arr) {
      if (el === date) {
        index = ind;
      }
    });

    if (index >= 0) {
      this.DATA.splice(index, 1);
      $('#' + this.componentID + ' [data-id="' + date + '"]').removeClass('days_cal--inner_selected');
    } else {
      this.DATA.push(date);
      $('#' + this.componentID + ' [data-id="' + date + '"]').addClass('days_cal--inner_selected');
    }

    localStorage.setItem(this.componentID, JSON.stringify(this.DATA));
  };

  //   Get Json data
  this.getjson = function(url, callback) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          var data = JSON.parse(ajax.responseText);
          return callback(data);
        }
      }
    };
    ajax.send();
  };

  // admin
  this.getItems = function() {
    var items = [],
      idkey;
    for (idkey in this.DATA) {
      if (this.DATA.hasOwnProperty(idkey)) {
        items.push(this.DATA[idkey]);
      }
    }
    return items;
  };

  // admin
  this.clearData = function() {
    this.DATA = {};
    localStorage.removeItem(this.componentID);
  };
}