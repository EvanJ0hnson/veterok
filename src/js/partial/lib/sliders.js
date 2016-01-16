import flexslider from 'flexslider';

/**
 * createReviewsSlider
 */
export function createReviewsSlider() {
  $('.cd-testimonials-wrapper').flexslider({
    selector: '.cd-testimonials > li',
    animation: 'slide',
    controlNav: false,
    slideshow: false,
    smoothHeight: true,
    start() {
      $('.cd-testimonials').children('li').css({
        opacity: 1,
        position: 'relative'
      });
    }
  });
}

/**
 * createPhotoSlider
 */
export function createPhotoSlider() {
  $('.cd-photoslider-wrapper').flexslider({
    selector: '.cd-photoslider > div',
    animation: 'slide',
    controlNav: false,
    slideshow: false,
    start() {
      $('.cd-photoslider').children('div').css({
        opacity: 1,
        position: 'relative'
      });
    }
  });
}

export function createTopSlider() {
  $('.cd-topslider-wrapper').flexslider({
    selector: '.cd-topslider > div',
    animation: 'slide',
    controlNav: true,
    directionNav: false,
    keyboard: false,
    slideshow: true,
    animationSpeed: 1000,
    slideshowSpeed: 3500,
    start() {
      $('.cd-topslider').children('div').css({
        opacity: 1,
        position: 'relative'
      });
    }
  });
}

export function createCalendarSlider() {
  $('.cd-calendar-wrapper').flexslider({
    selector: '.cd-calendar > li',
    animation: 'slide',
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    start() {
      $('.cd-calendar').children('li').css({
        opacity: 1,
        position: 'relative'
      });
    }
  });
}
/**
 * createSliders
 */