import flexslider from 'flexslider';

/**
 * Get configuration for exact slider type
 * @param  {String} sliderName Slider name
 * @return {Object}            Slider config
 */
function getSliderConfig(sliderName) {
  let parent = '';
  let innerSelector = '';
  const config = {};
  const localConfig = {};

  switch (sliderName) {
    case 'top':
      parent = '.cd-topslider';
      innerSelector = 'div';
      Object.assign(localConfig, {
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        keyboard: false,
        slideshow: true,
        animationSpeed: 1000,
        slideshowSpeed: 3500,
      });
      break;
    case 'photos':
      parent = '.cd-photoslider';
      innerSelector = 'div';
      Object.assign(localConfig, {
        animation: 'slide',
        controlNav: false,
        slideshow: false,
      });
      break;
    case 'userReviews':
      parent = '.cd-testimonials';
      innerSelector = 'li';
      Object.assign(localConfig, {
        animation: 'slide',
        controlNav: false,
        slideshow: false,
        smoothHeight: true,
      });
      break;
    case 'calendar':
      parent = '.cd-calendar';
      innerSelector = 'li';
      Object.assign(localConfig, {
        animation: 'slide',
        controlNav: false,
        slideshow: false,
        smoothHeight: false,
      });
      break;
    default:
      break;
  }

  Object.assign(config, {
    wrapper: parent + '-wrapper',
    settings: {
      selector: parent + ' > ' + innerSelector,
      start() {
        $(parent).children(innerSelector).css({
          opacity: 1,
          position: 'relative'
        });
      },
    }
  });

  Object.assign(config.settings, localConfig);

  return config;
}

/**
 * Create slider instance
 * @param  {String} sliderName Slider's name
 * @return {jQuery Object}            Slider instance
 */
export default function create(sliderName) {
  const config = getSliderConfig(sliderName);
  $(config.wrapper).flexslider(config.settings);
}
