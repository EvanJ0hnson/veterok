function WICalendar(obj) {
  this.widjetObj;
  this.widjetObjOut;
  this.widjetID = "";
  this.objNAME = obj;
  this.year;
  this.month;
  this.json_url = "";
  this.hallNumber;
  this.DATA = {};

  this.initObject = function(widjetID, json_url, hallNumber) {
    this.json_url = json_url;
    this.hallNumber = hallNumber;
    this.widjetID = widjetID;
    this.widjetObj = $('#' + widjetID);
    this.widjetObjOut = $('#' + widjetID + '_out');

    this.DATA = JSON.parse(localStorage.getItem(widjetID)); // code to try
       if ($.isEmptyObject(this.DATA)) {
          this.DATA = {};
       }
    var
      Calendar = new Date();
    this.year = Calendar.getFullYear(),
    this.month = Calendar.getMonth();
    this.renderCalendar(this.year, this.month);
  }

  this.calNavigation = function (direction) {
    switch (direction) {
      case 'next':
          this.month++;
          if (this.month == 12) {
            this.year++;
            this.month = 0;
          }
          break;
      case 'prev':
          this.month--;
          if (this.month == -1) {
            this.year--;
            this.month = 11;
          }
          break;
        default:
            break;
    };
    this.renderCalendar(this.year,this.month);
  }

  this.renderCalendar = function (year, month) {
    // show info on init
    // link
    var url = this.json_url;
    var hallReservationDate = this.DATA[this.hallNumber];
    var widjetID = this.widjetID

    // get json
    this.getjson(url, function(obj) {
      for (var key in obj) {
        // if has envent add class
        if($('[data-id="' + key + '"]')){
          $('[data-id="' + key + '"]').attr('onclick', '')
          $('[data-id="' + key + '"]').addClass('days_cal--event');
        }
      }
      // добавить проверку наличия элементов
      if (hallReservationDate !== undefined) {
         hallReservationDate.forEach(function (el,ind,arr) {
           // console.log(ind, arr[ind], hallReservationDate);
           $('#' + widjetID + ' [data-id="' +  arr[ind] + '"]').addClass('days_cal--inner_selected');
         });
      }
    });

    // vars
    var
      Calendar = new Date();
      Calendar.setDate(1);
      Calendar.setYear(year);
      Calendar.setMonth(month);
      day_of_week = new Array('ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'),
      month_of_year = new Array('Январь', 'Февраль', 'Март', 'Апрель', 'Май',
        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'),
      html = '';

    // head
    html = '<table class="table_calendar">';
    html += '<thead>';
    html += '<tr class="head_cal"> \
    <th><button class="btn btn--add btn--add-lg" onclick="' + this.objNAME + '.calNavigation(\'prev\')"><span class="fa fa-arrow-circle-left"></button></th> \
    <th colspan="5"></span>' + month_of_year[month] + ', ' + year + '</th> \
    <th><button class="btn btn--add btn--add-lg" onclick="' + this.objNAME + '.calNavigation(\'next\')"><span class="fa fa-arrow-circle-right"></button></th></tr>';
    // html += '<tr class="subhead_cal"><th colspan="7">' + Calendar.getFullYear() + '</th></tr>';
    html += '<tr class="week_cal">';
    //Weekdays
    for (index = 0; index < 7; index++) {
      // if (weekday == index) {
      //   html += '<th class="week_event">' + day_of_week[index] + '</th>';
      // } else {
        html += '<th>' + day_of_week[index] + '</th>';
      // }
    }

    html += '</tr>';
    html += '</thead>';

    // body
    html += '<tbody class="days_cal">';
    html += '</tr>';
    // white zone
    var D1Nfirst = new Date(year,month,1).getDay();// день недели первого дня месяца
    if (D1Nfirst != 0) {
      for (index = 1; index < D1Nfirst; index++) {
        html += '<td class="white_cal"></td>';
      }
    } else { // если первый день месяца выпадает на воскресенье, то требуется 6 пустых клеток
      for(index = 0; index < 6; index++) html += '<td class="white_cal"></td>';
    }

    for (index = 0; index < 31; index++) {
      if (Calendar.getDate() > index) {
        week_day = Calendar.getDay();
        if (week_day !== 7) {
          // this day
          var day = Calendar.getDate();
          var info = day + '.' + (Calendar.getMonth() + 1) + '.' + Calendar.getFullYear();
            html += '<td><span class="days_cal--inner js-bookDay" data-hall="' + this.hallNumber + '" data-id="' + info + '" onclick="' + this.objNAME + '.bookDay(\'' + this.hallNumber + '\', \'' + info + '\')">' + day + '</span></td>';
        }
        if (week_day == 0) {
          html += '</tr>';
        }
      }
      Calendar.setDate(Calendar.getDate() + 1);
    }; // end for loop

    this.widjetObj.html(html);
  }

  this.bookDay = function (hall, date) {
    if ($.isEmptyObject(this.DATA[hall])) {
       this.DATA[hall] = [];
    }
    // for (var i = 0; i <= this.DATA[hall].length; i++){

    var index = -1;
    this.DATA[hall].forEach(function (el,ind,arr) {
      if (el == date) index = ind;
    });

    if (index >= 0) {
      this.DATA[hall].splice(index, 1);
      $('#' + this.widjetID + ' [data-id="' + date + '"]').removeClass('days_cal--inner_selected');
      console.log('deleted ' + date);
    } else {
        this.DATA[hall].push(date);
        $('#' + this.widjetID + ' [data-id="' + date + '"]').addClass('days_cal--inner_selected');
        console.log('added ' + date);
      }

    // var calendarOut = 'Зал №' + hall + ': ';
    // this.DATA[hall].forEach(function (el,ind,arr) {
    //   if (el == date) index = ind;
    //   calendarOut += el + ', ';
    // });
    // this.widjetObjOut.html(calendarOut);

    localStorage.setItem(this.widjetID, JSON.stringify(this.DATA));

    console.log(this.DATA[hall]);
    console.log(index);
  }


  //   Get Json data
  this.getjson = function (url, callback) {
    var self = this,
        ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4) {
        if (ajax.status == 200) {
          var data = JSON.parse(ajax.responseText);
          console.log(data);
          return callback(data);
        } else {
          console.log(ajax.status);
        }
      }
    };
    ajax.send();
  }

  this.getItems = function () {
    var items = [];
    for(var idkey in this.DATA) {
      items = this.DATA[idkey];
    }
    console.log(items);
    return items;
  }

  this.clearData = function () {
    this.DATA = {};
    localStorage.removeItem(this.widjetID);
  }

}