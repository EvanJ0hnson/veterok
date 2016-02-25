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
    default:
      break;
  }
});
