'use strict';
// Warning! This script contains a lot of stupid code. I will make it better, I promise.
import $ from 'jquery-browserify';

import smoothScroll from './lib/smoothScroll';
import fixIOSvh from './lib/fixIosVh';
import stickyNavigation from './lib/stickyNavigation';
import modalWindow from './lib/modalWindow';
import formSubmit from './lib/formSubmit';
import * as sliders from './lib/sliders';
import WICard from './cart';
import WICalendar from './calendar';

/**
 * Cart init
 */
let cart;
function createCart() {
  cart = new WICard('cart');
  cart.init('cart-widjet');
}
/**
 * Cart init
 */

/**
 * Calendar init
 */
let vCal1;
let vCal2;
let vCal3;
function initCalendar(isAdmin) {
  vCal1 = new WICalendar('vCal1');
  vCal1.initObject('calendar_1', '../data/calendar-room_1.json', isAdmin);
  vCal2 = new WICalendar('vCal2');
  vCal2.initObject('calendar_2', '../data/calendar-room_2.json', isAdmin);
  vCal3 = new WICalendar('vCal3');
  vCal3.initObject('calendar_3', '../data/calendar-room_3.json', isAdmin);
}
/**
 * Calendar
 */

/**
 * Initialization
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
$(() => {
  switch (app.entry) {
    case 'index':
      smoothScroll();
      fixIOSvh();
      stickyNavigation();
      modalWindow();
      formSubmit();
      sliders.createTopSlider();
      sliders.createReviewsSlider();
      break;
    default:
      break;
  }
});
