/**
 * [modalWindow description]
 * @return {[type]} [description]
 */
import loader from './loader';
import {disable_scroll, enable_scroll} from './scrollControl';
import vtSlider from './sliders';
import tvCalendar from '../calendar';
import vtCart from '../cart';

export default function modalWindow() {
  $('.js-showPopup').on('click', (event) => {
    const $body = $('body');
    const $eventTarget = $(event.currentTarget);
    const popupName = $eventTarget.attr('data-popupName');
    const vOverlay = '<div id="popup_overlay" class="overlay grey"> \
      <div class="overlay--close-btn"></div> \
      </div> \
      <div id="spinner" class="spinner" style="display:none;"> \
      <span class="fa fa-spinner fa-pulse"></span></div>';
    const vPopup = '<div class="popup"></div>';

    $body.append(vOverlay)
      .append(vPopup);

    const $popup = $('.popup');
    const $popupOverlay = $('#popup_overlay');

    $popupOverlay.toggleClass('visible');

    $body.css('width', $body.css('width'));
    $body.toggleClass('u-overflow--hidden');

    loader();
    disable_scroll();
    switch (popupName) {
      case 'reservation':
        $popup.addClass('gold popup-menu_window');
        $popup.load('popupWindows/' + popupName + '.html', () => {
          new tvCalendar().initObject('calendar_1', '../data/calendar-room_1.json', '');
          new tvCalendar().initObject('calendar_2', '../data/calendar-room_2.json', '');
          new tvCalendar().initObject('calendar_3', '../data/calendar-room_3.json', '');
          vtSlider('calendar');
          enable_scroll();
        });
        break;
      case 'menu':
        vtCart().showWinow();
        break;
      case 'news':
        $popup.addClass('gold popup-menu_window');
        $popup.load('popupWindows/' + popupName + '.php', () => {
          enable_scroll();
        });
        break;
      case 'photos':
        const photoFolder = $eventTarget.attr('data-photoFolder');
        $popup.addClass('popup-photos u-overflow--hidden');
        $popup.load('popupWindows/imgRouter.php', {type: photoFolder}, () => {
          vtSlider('photos');
        });
        break;
      case 'servicesPhoto':
        const src = $eventTarget.attr('data-src');
        $popup.addClass('popup-photos no-overflow');
        $popup.load('popupWindows/servicesRouter.php', {type: src}, () => {
          vtSlider('photos');
        });
        break;
      default:
        break;
    }

    $popup.toggleClass('visible', true);
  });

  $('body').delegate('#popup_overlay', 'click', () => {
    const $body = $('body');
    const $popup = $('.popup');
    const $popupOverlay = $('#popup_overlay');
    const $spinner = $('#spinner');

    $popup.toggleClass('visible', false);
    $popupOverlay.toggleClass('visible');

    $body.css('width', 'auto');
    $body.toggleClass('u-overflow--hidden', false);

    $popup.remove();
    $spinner.remove();
    $popupOverlay.remove();

    enable_scroll();
  });
}
