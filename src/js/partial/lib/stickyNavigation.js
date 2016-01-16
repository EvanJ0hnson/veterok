/**
 * [stickyNavigation description]
 * @return {[type]} [description]
 */
export default function stickyNavigation() {
  $(window).on('scroll', () => {
    const e = window.pageYOffset;
    const t = $('.top_nav');
    t[e > 200 ? 'addClass' : 'removeClass']('top_nav-sticky');
    const n = $('.top_nav--logo-ribbon');
    n[e > 200 ? 'addClass' : 'removeClass']('top_nav--logo-ribbon-sticky');
  });
}
/**
 * stickyNavigation
 */
