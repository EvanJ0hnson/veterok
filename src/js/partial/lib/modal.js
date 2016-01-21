/**
 * [modalWindow description]
 * @return {[type]} [description]
 */
// import loader from './loader';
// import {disable_scroll, enable_scroll} from './scrollControl';
import hbsModal from '../../../templates/modal.hbs';

const $body = $('body');

export function open(modalContent) {
  // const $eventTarget = $(event.currentTarget);
  // const popupName = $eventTarget.attr('data-popupName');

  $body.append(hbsModal({}));

  const $popupOverlay = $('#popup_overlay');
  const $popup = $('.popup');

  $popup.append(modalContent);

  $popupOverlay.toggleClass('visible');

  // $body.css('width', $body.css('width'));
  // $body.toggleClass('u-overflow--hidden');

  // disable_scroll();

  $popup.toggleClass('visible', true);
}

export function close() {
  const $popup = $('.popup');
  const $popupOverlay = $('#popup_overlay');

  $popup.toggleClass('visible', false);
  $popupOverlay.toggleClass('visible');

  $body.css('width', 'auto');
  $body.toggleClass('u-overflow--hidden', false);

  $popup.remove();
  $popupOverlay.remove();

  // enable_scroll();
}
