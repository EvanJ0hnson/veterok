/**
 * Stick navigation bar to top on scroll
 */
export default function stickyNavigation() {
  $(window).on('scroll', () => {
    const e = window.pageYOffset;
    const t = $('.top-nav');
    const n = $('.top-nav__logo-ribbon');
    const f = $('.top-nav__logo-square');
    t[e > 200 ? 'addClass' : 'removeClass']('top-nav--sticky');
    n[e > 200 ? 'addClass' : 'removeClass']('u-display--none');
    f[e > 200 ? 'removeClass' : 'addClass']('u-display--none');
  });
}
