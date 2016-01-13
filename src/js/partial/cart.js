'use strict';

function WICard(obj) {
  this.objNAME = obj;
  this.DATA = null;
  this.IDS = null;
  this.widjetObj = null;
  this.widjetID = null;

  this.init = (widjetID) => {
    this.DATA = JSON.parse(localStorage.getItem(widjetID)) || {};

    this.IDS = JSON.parse(localStorage.getItem(widjetID + '_ids')) || [];

    this.widjetID = widjetID;
    this.widjetObj = $('#' + widjetID);

    if ($.isEmptyObject(this.DATA)) {
      this.widjetObj.html('Корзина пуста');
    } else {
      this.reCalc();
    }
  };

  this.addToCart = (curObj, id, name, price, render) => {
    id = ($.isNumeric(id)) ? 'ID' + id.toString() : id;

    // Нужно убрать проверку  === true и передавать '' вместо false
    // И вообще, какая-то здесь ерунда с render
    render = render || true;

    const goodieLine = {
      id,
      name,
      price,
      num: 1,
    };

    if ($.isEmptyObject(this.DATA)) {
      this.DATA[id] = goodieLine;
      this.IDS.push(id);
    } else {
      let idKey = null;
      for (idKey in this.DATA) {
        if (this.DATA.hasOwnProperty(idKey)) {
          if ($.inArray(id, this.IDS) === -1) {
            this.DATA[id] = goodieLine;
            this.IDS.push(id);
          } else {
            if (idKey === id) {
              this.DATA[idKey].num += 1;
            }
          }
        }
      }
    }

    localStorage.setItem(this.widjetID, JSON.stringify(this.DATA));
    localStorage.setItem(this.widjetID + '_ids', JSON.stringify(this.IDS));
    this.reCalc();

    if (render === true) {
      this.renderBasketTable();
    }
  };

  this.delItem = (id, count) => {
    id = ($.isNumeric(id)) ? 'ID' + id.toString() : id;

    switch (count) {
      case 'all':
        delete this.DATA[id];
        const ind = $.inArray(id, this.IDS);
        if (ind >= 0) {
          this.IDS.splice(ind, 1);
        }
        break;
      case 'one':
        let idKey;
        for (idKey in this.DATA) {
          if (this.DATA.hasOwnProperty(idKey)) {
            if (idKey === id) {
              if (this.DATA[idKey].num === 1) {
                delete this.DATA[id];
                this.IDS.splice($.inArray(id, this.IDS), 1);
              } else {
                this.DATA[idKey].num -= 1;
              }
            }
          }
        }
        break;
      default:
        break;
    }

    this.reCalc();
    this.renderBasketTable();

    localStorage.setItem(this.widjetID, JSON.stringify(this.DATA));
    localStorage.setItem(this.widjetID + '_ids', JSON.stringify(this.IDS));
  };

  this.reCalc = () => {
    let num = 0;
    let sum = 0;
    let counter = 0;
    let idkey = null;

    for (idkey in this.DATA) {
      if (this.DATA.hasOwnProperty(idkey)) {
        counter++;
        num += parseInt(this.DATA[idkey].num, 10);
        sum += parseFloat(parseInt(this.DATA[idkey].num, 10) * parseFloat(this.DATA[idkey].price, 10));
      }
    }

    if (num > 0) {
      this.widjetObj.html('Блюд: ' + counter + ', сумма заказа: ' + sum + ' <span class="fa fa-rub">');
    } else {
      this.widjetObj.html('Корзина пуста');
    }
  };

  this.renderBasketTable = () => {
    let sum = 0;
    let counter = 0;
    let idkey = null;
    let productLine = null;
    let tableCaption = null;

    if ($('#popup_cart').length === 0) {
      $('body').append('<div id="popup_cart" class="popup popup-menu_window gold"> \
        <h1 id="bsubject" class="sc-heading">Банкетное меню</h1> \
        <table class="cart-table" id="cart-table"></table> \
        <div class="cart-footer"><span id="cart-sum" class="cart-sum"></span></div> \
        <form id="fMenuReservation"> \
        <input type="text" id="userContact" class="gold" name="message" placeholder="Не забудьте, пожалуйста, представиться и оставить контактный телефон." required></textarea> \
        <button id="btnSubmitMenuReservation" class="btn btn--gold btn--sendMenu" name="btnSubmitMenuReservation">Отправить на утверждение</button> \
        <button onclick="print()" class="btn btn--gold btn--sendMenu" name="btnPrintMenuReservation">Распечатать  или сохранить в PDF</button> \
        <input type="hidden" name="event" value="sendMenuReservation"> \
        </form> \
    ');
    }

    $('#cart-table').html('');

    tableCaption = '<tr class="cart-table-caption"><td>№</td><td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td></tr>';

    $('#cart-table').append(tableCaption);

    for (idkey in this.DATA) {
      if (this.DATA.hasOwnProperty(idkey)) {
        sum += parseFloat(this.DATA[idkey].price * this.DATA[idkey].num);
        counter++;
        productLine = '<tr class="cart-table-item" id="wigoodline-' + this.DATA[idkey].id + '"> \
        <td>' + counter + '</td> \
        <td>' + this.DATA[idkey].name + '</td> \
        <td class="wigoodprice">' + this.DATA[idkey].price + ' <span class="fa fa-rub"></span></td> \
        <td> \
        <button class="btn btn--add" onclick="' + this.objNAME + '.delItem(\'' + this.DATA[idkey].id + '\', \'one\')"><span class="fa fa-minus-circle"></span></button> \
        ' + this.DATA[idkey].num + ' <button class="btn btn--add" onclick="cart.addToCart(this, \'' + this.DATA[idkey].id + '\', \'' + this.DATA[idkey].name + '\', \'' + this.DATA[idkey].price + '\')"><span class="fa fa-plus-circle"></span></button></td> \
        <td>' + parseFloat(this.DATA[idkey].price * this.DATA[idkey].num) + '</td> \
        <td><a class="btn btn--add" onclick="' + this.objNAME + '.delItem(\'' + this.DATA[idkey].id + '\', \'all\')"><span class="fa fa-times"></span></a></td> \
        </tr>';
        $('#cart-table').append(productLine);
      }
    }
    $('#cart-sum').html('Общая сумма: ' + sum + ' <span class="fa fa-rub"></span>');
  };

  this.getItems = () => {
    let items = '';
    let sum = 0;
    let counter = 0;
    let idkey = null;
    let productLine = null;

    for (idkey in this.DATA) {
      if (this.DATA.hasOwnProperty(idkey)) {
        sum += parseFloat(this.DATA[idkey].price * this.DATA[idkey].num);
        counter++;
        productLine = counter + ' ' + this.DATA[idkey].name + ' ' + this.DATA[idkey].price + ' ' + this.DATA[idkey].num + ' :' + parseFloat(this.DATA[idkey].price * this.DATA[idkey].num) + '\n';
        items += productLine;
      }
    }
    items += '\nИтого:' + sum;
    return items;
  };

  this.showWinow = () => {
    this.renderBasketTable();
    $('#popup_cart').toggleClass('visible');
  };
}
