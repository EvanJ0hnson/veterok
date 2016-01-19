/**
 * iOS hack to change vh to px
 */
const iOS = navigator.userAgent.match(/(iPod|iPhone)/);
const $window = $(window);

function changeHeight() {
  const height = $window.height();
  const $top = $('.top');
  const $spacer = $('.spacer');

  $top.css('min-height', height * 1.25 + 'px');
  $top.css('max-height', height * 1.25 + 'px');
  $spacer.css('padding-top', height * 0.55 + 'px');
}

export default function fixBug() {
  if (iOS) {
    changeHeight();
    $window.bind('resize', changeHeight);
  }
}
