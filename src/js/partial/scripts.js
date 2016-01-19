'use strict';

import $ from 'jquery-browserify';

import smoothScroll from './lib/smoothScroll';
import fixIOSvh from './lib/fixIosVh';
import stickyNavigation from './lib/stickyNavigation';
import modalWindow from './lib/modalWindow';
import formSubmit from './lib/formSubmit';
import vtSlider from './lib/sliders';
import vtCard from './cart';

/**
 * Initialization
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
      vtSlider('top');
      vtSlider('photos');
      vtSlider('userReviews');
      break;
    case '/menu.php':
      smoothScroll();
      stickyNavigation();
      modalWindow();
      formSubmit();
      new vtCard().init('cart-widjet');
      break;
    default:
      console.log('Error: missing state');
      break;
  }
});
