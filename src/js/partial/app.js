'use strict';

import $ from 'jquery-browserify';

import smoothScroll from './lib/smoothScroll';
// import fixIOSvh from './lib/fixIosVh';
import stickyNavigation from './lib/stickyNavigation';
import modalWindow from './lib/modalWindow';
import formSubmit from './lib/formSubmit';
import vtSlider from './lib/sliders';
import VTCart from './cart';
import googleMapsLoader from './lib/googleMapsLoader';

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  const currentState = window.location.pathname;
  switch (currentState) {
    case '/':
      smoothScroll();
      // fixIOSvh();
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
      // stickyNavigation();
      modalWindow();
      formSubmit();

      const cart = new VTCart('cart-widjet');
      cart.init();
      break;
    default:
      console.log('Error: missing state');
      break;
  }
});
