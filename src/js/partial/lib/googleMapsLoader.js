import * as _u from './utilites';
/**
 * Add iFrame with Google Maps to a page
 * @param  {String} selector Wrapper name
 */
export default function (selector) {
  const element = _u.getElement('#' + selector);
  const googleMapsFrame = '<iframe src="https://www.google.ru/maps/embed?pb=!1m16!1m12!1m3!1d19290.2044802909!2d50.52257565987898!3d52.817396981649324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KHQsNC80LDRgNCwLCDQn9C-0LTRitC10Lwt0JzQuNGF0LDQudC70L7QstC60LA!5e0!3m2!1sru!2sru!4v1426198644037" width="100%" height="450" frameborder="0" style="border:0;"></iframe>';
  element.innerHTML = googleMapsFrame;
}
