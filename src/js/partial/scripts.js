'use strict';
// Warning! This script contains a lot of stupid code. I will make it better, I promise.

/**
 * Cart init
 */
let cart;
function createCart() {
  cart = new WICard ('cart');
  cart.init('cart-widjet');
}
/**
 * Cart init
 */

/**
 * Calendar init
 */
let vCal1;
let vCal2;
let vCal3;
function initCalendar(isAdmin) {
  vCal1 = new WICalendar('vCal1');
  vCal1.initObject('calendar_1', '../data/calendar-room_1.json', isAdmin);
  vCal2 = new WICalendar('vCal2');
  vCal2.initObject('calendar_2', '../data/calendar-room_2.json', isAdmin);
  vCal3 = new WICalendar('vCal3');
  vCal3.initObject('calendar_3', '../data/calendar-room_3.json', isAdmin);
}
/**
 * Calendar
 */

/**
 * updateReservations (admin page)
 */
function updateReservations() {
  $('.js-updateReservations').on('click', (event) => {
    const id = $(event.currentTarget).attr('data-id');
    const scriptFilePath = 'admin-updateReservations.php';
    let calendarItems = [];
    switch (id) {
      case '1':
        calendarItems = vCal1.getItems();
        break;
      case '2':
        calendarItems = vCal2.getItems();
        break;
      case '3':
        calendarItems = vCal3.getItems();
        break;
      default:
        break;
    }
    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: 'message=' + calendarItems + '&id=' + id,
      success(answer) {
        alert(answer);
      }
    });
  });
}

/**
 * [formSubmit description]
 * @return {[type]} [description]
 */
function formSubmit() {
  const scriptFilePath = 'formSubmit.php';
  $('#fSendReview').on('submit', (event) => {
    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: $(event.currentTarget).serialize(),
      success(answer) {
        $('#reviewText').val(answer);
      }
    });
    return false;
  });
  $('body').delegate('#fHallReservation', 'submit', () => {
    const msg = $('#userContact').val();
    const dates = [];

    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      alert('Введите контактные данные, пожалуйста.');
      return false;
    }

    dates.push(JSON.parse(localStorage.getItem('calendar_1')));
    dates.push(JSON.parse(localStorage.getItem('calendar_2')));
    dates.push(JSON.parse(localStorage.getItem('calendar_3')));

    if (dates[0] !== null) {
      dates[3] = dates[0][1];
    } else {
      dates[3] = '—';
    }
    if (dates[1] !== null) {
      dates[4] = dates[1][2];
    } else {
      dates[4] = '—';
    }
    if (dates[2] !== null) {
      dates[5] = dates[2][3];
    } else {
      dates[5] = '—';
    }
    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: $(event.currentTarget).serialize() + '&formBody=ЗАЯВКА НА БРОНИРОВАНИЕ БАНКЕТНОГО ЗАЛА' + '\nИмя и контактные данные: ' + msg + '\nЗал №1: ' + dates[3] + '\nЗал №2: ' + dates[4] + '\nЗал №3: ' + dates[5],
      success(answer) {
        $('#userContact').val(answer);
      }
    });
    return false;
  });

  $('body').delegate('#fMenuReservation', 'submit', () => {
    const msg = $('#userContact').val();
    const cartItems = cart.getItems();

    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      alert('Введите контактные данные, пожалуйста.');
      return false;
    }

    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: $(event.currentTarget).serialize() + '&formBody=Имя и контактные данные: ' + msg + '\nМЕНЮ\n' + cartItems,
      success(answer) {
        $('#userContact').val(answer);
      }
    });
    return false;
  });
}

/**
 * [modalWindow description]
 * @return {[type]} [description]
 */
function modalWindow() {
  // var navWidth = $('nav').css('width');
  $('.js-showPopup').on('click', (event) => {
    console.log(event)
    const popupName = $(event.currentTarget).attr('data-popupName');
    const vOverlay = '<div id="popup_overlay" class="overlay grey"> \
      <div class="overlay--close-btn"></div> \
      </div> \
      <div id="spinner" class="spinner" style="display:none;"> \
      <span class="fa fa-spinner fa-pulse"></span></div>';
    const vPopup = '<div class="popup"></div>';

    $('body').append(vOverlay);
    $('body').append(vPopup);

    $('#popup_overlay').toggleClass('visible');

    $('body').css('width', $('body').css('width'));
    // $('nav').css('width', navWidth);
    $('body').toggleClass('no-overflow');
    // $("#spinner").show();
    loader();
    disable_scroll();
    switch (popupName) {
      case 'reservation':
        $('.popup').addClass('gold popup-menu_window');
        $('.popup').load('popupWindows/' + popupName + '.html', () => {
          createCalendarSlider();
          initCalendar('');
          enable_scroll();
        });
        break;
      case 'menu':
        cart.showWinow();
        // $('.popup').addClass('gold popup-menu_window');
        // $('.popup').load('popupWindows/' + popupName + '.html', function() {
        //     createCart(this);
        //     enable_scroll(this);
        //   });
        break;
      case 'news':
        $('.popup').addClass('gold popup-menu_window');
        $('.popup').load('popupWindows/' + popupName + '.php', () => {
          enable_scroll();
        });
        break;
      case 'photos':
        const photoFolder = $(event.currentTarget).attr('data-photoFolder');
        $('.popup').addClass('popup-photos no-overflow');
        $('.popup').load('popupWindows/imgRouter.php', {type: photoFolder}, () => {
          createPhotoSlider();
        });
        break;
      case 'servicesPhoto':
        const src = $(event.currentTarget).attr('data-src');
        $('.popup').addClass('popup-photos no-overflow');
        $('.popup').load('popupWindows/servicesRouter.php', {type: src}, () => {
          createPhotoSlider();
        });
        break;
      default:
      // временная заглушка для пустых модальных окон, переделать
        const fadeOutDelay = 225;
        $('.popup').toggleClass('visible', false);
        $('#popup_overlay').toggleClass('visible');
        enable_scroll();
        setTimeout(() => {
          $('body').css('width', 'auto');
          $('body').toggleClass('no-overflow', false);
        }, fadeOutDelay);
        setTimeout(() => {
          enable_scroll();
          $('.popup').remove();
          $('#spinner').remove();
          $('#popup_overlay').remove();
        }, fadeOutDelay);
        break;
    }
    $('.popup').toggleClass('visible', true);
  });

  $('body').delegate('#popup_overlay', 'click', () => {
    const fadeOutDelay = 225;
    $('.popup').toggleClass('visible', false);
    $('#popup_overlay').toggleClass('visible');
    enable_scroll();
    setTimeout(() => {
      $('body').css('width', 'auto');
      $('body').toggleClass('no-overflow', false);
    }, fadeOutDelay);
    setTimeout(() => {
      enable_scroll();
      $('.popup').remove();
      $('#spinner').remove();
      $('#popup_overlay').remove();
    }, fadeOutDelay);
  });
}

/**
 * createSliders block
 */

/**
 * createReviewsSlider
 */
function createReviewsSlider() {
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
function createPhotoSlider() {
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

function createTopSlider() {
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

function createCalendarSlider() {
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

/**
 * hack scroll for modal
 */
const keys = [37, 38, 39, 40];
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function keydown(e) {
  let i = keys.length;
  for (i; i--; null) {
  // for (;;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  document.ontouchmove = (e) => {
    e.preventDefault();
  };
}

function enable_scroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  document.ontouchmove = () => {
    return true;
  };
}
/**
 * hack scroll for modal
 */

/**
 * showAjaxSpinner
 */
function loader() {
  $(document).ajaxStart(() => {
    $('#spinner').show();
  });
  $(document).ajaxComplete(() => {
    $('#spinner').hide();
  });
}
/**
 * showAjaxSpinner
 */

/**
 * [stickyNavigation description]
 * @return {[type]} [description]
 */
function stickyNavigation() {
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

/**
 * [smoothScroll description]
 * @return {[type]} [description]
 */
function smoothScroll() {
  $('a[href^="#"], a[href^="."]').on('click', (event) => {
    const scroll_el = $(event.currentTarget).attr('href');
    // возьмем содержимое атрибута href
    if ($(scroll_el).length !== 0) {
    // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 350); // анимируем скроолинг к элементу scroll_el
    }
    return false;
  });
}
/**
 * smoothScrolling
 */

/**
 * iOS hack to change vh to px
 */
const iOS = navigator.userAgent.match(/(iPod|iPhone)/);

function iosVhHeightBug() {
  const height = $(window).height();
  $('.top').css('min-height', height * 1.25 + 'px');
  $('.top').css('max-height', height * 1.25 + 'px');
  $('.spacer').css('padding-top', height * 0.55 + 'px');
}

if (iOS) {
  iosVhHeightBug();
  $(window).bind('resize', iosVhHeightBug);
}
/**
 * iOS hack to change vh to px
 */
