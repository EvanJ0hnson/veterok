'use strict';

import $ from 'jquery-browserify';

import smoothScroll from './lib/smoothScroll';
import stickyNavigation from './lib/stickyNavigation';
import modalWindow from './lib/modalWindow';
import formSubmit from './lib/formSubmit';
import vtSlider from './lib/sliders';
import VTCart from './cart';
import googleMapsLoader from './lib/googleMapsLoader';
import fixIosVh from './lib/fixIosVh';
import VTCalendar from './calendar';

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  const currentState = window.location.pathname;
  switch (currentState) {
    case '/':
      fixIosVh();
      smoothScroll();
      stickyNavigation();
      modalWindow();
      formSubmit();
      vtSlider('top');
      vtSlider('photos');
      vtSlider('userReviews');
      googleMapsLoader('google-maps__wrapper');
      break;
    case '/menu.php':
      smoothScroll();
      modalWindow();
      formSubmit();

      const cart = new VTCart('cart-widjet');
      cart.init();
      break;
    case '/admin/admin-calendar.php':
      const calendar_1 = new VTCalendar();
      const calendar_2 = new VTCalendar();
      const calendar_3 = new VTCalendar();
      calendar_1.initObject('calendar_1', '../data/calendar-room_1.json', 'true');
      calendar_2.initObject('calendar_2', '../data/calendar-room_2.json', 'true');
      calendar_3.initObject('calendar_3', '../data/calendar-room_3.json', 'true');
      $('.js-updateReservations').on('click', (event) => {
        const id = $(event.currentTarget).attr('data-id');
        const scriptFilePath = 'admin-updateReservations.php';
        let calendarItems = null;
        switch (id) {
          case '1':
            calendarItems = calendar_1.getItems();
            break;
          case '2':
            calendarItems = calendar_2.getItems();
            break;
          case '3':
            calendarItems = calendar_3.getItems();
            break;
          default:
            break;
        }

        $.ajax({
          type: 'POST',
          url: scriptFilePath,
          data: 'message=' + calendarItems + '&id=' + id,
          success() {
            alert('Данные сохранены');
          }
        });
      });
      break;
    default:
      break;
  }
});
