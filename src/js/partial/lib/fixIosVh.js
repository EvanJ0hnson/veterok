/**
 * iOS hack to change vh to px
 */
const iOS = navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i);
const $window = $(window);

function changeHeight() {
  const height = $window.height();
  const $top = $('.cd-topslider');

  $top.css('height', height + 'px');
}

export default function fixBug() {
  if (iOS) {
    changeHeight();
    $window.bind('resize', changeHeight);
  }
}
