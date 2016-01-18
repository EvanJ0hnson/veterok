'use strict';
// Warning! This script contains a lot of stupid code. I will make it better, I promise.
import $ from 'jquery-browserify';

import smoothScroll from './lib/smoothScroll';
import fixIOSvh from './lib/fixIosVh';
import stickyNavigation from './lib/stickyNavigation';
import modalWindow from './lib/modalWindow';
import formSubmit from './lib/formSubmit';
import * as sliders from './lib/sliders';
import vtCard from './cart';

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
 * Initialization
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
$(() => {
  const currentState = window.location.pathname;
  switch (currentState) {
    case '/':
      smoothScroll();
      fixIOSvh();
      stickyNavigation();
      modalWindow();
      formSubmit();
      sliders.createTopSlider();
      sliders.createReviewsSlider();
      break;
    case '/menu.php':
      smoothScroll();
      stickyNavigation();
      modalWindow();
      formSubmit();
      new vtCard().init('cart-widjet');
      break;
    default:
      console.log("Error: missing state")
      break;
  }
});
