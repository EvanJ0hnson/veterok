'use strict';
// Warning! This script contains a lot of stupid code. I will make it better, I promise.
// Cheked with JSLint for Sublime Text
// Only "was used before it was defined" errors left

// Cart{
var cart;
function createCart() {
  cart = new WICard("cart");
  cart.init("cart-widjet");
}
// Cart}

// Calendar {
var
  vCal1,
  vCal2,
  vCal3;
function initCalendar(isAdmin) {
  vCal1 = new WICalendar('vCal1');
  vCal1.initObject('calendar_1', '../data/calendar-room_1.json', isAdmin);
  vCal2 = new WICalendar('vCal2');
  vCal2.initObject('calendar_2', '../data/calendar-room_2.json', isAdmin);
  vCal3 = new WICalendar('vCal3');
  vCal3.initObject('calendar_3', '../data/calendar-room_3.json', isAdmin);
}
// Calendar}

// {admin
// для администрирования, вынести в отдельный файл
function updateReservations() {
  $('.js-updateReservations').on('click', function () {
    var id = $(this).attr('data-id');
    var scriptFilePath = 'admin-updateReservations.php';
    var calendarItems = [];
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
      success: function (answer) {
        alert(answer);
      }
    });
  });
}
// admin}

function formSubmit() {
  var scriptFilePath = 'formSubmit.php';
  $('#fSendReview').on('submit', function () {
    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: $(this).serialize(),
      success: function (answer) {
        $('#reviewText').val(answer);
      }
    });
    return false;
  });
  $('body').delegate('#fHallReservation', 'submit', function () {
    var msg  = $("#userContact").val();
    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      alert("Введите контактные данные, пожалуйста.");
      return false;
    }
    var dates = [];
    dates.push(JSON.parse(localStorage.getItem('calendar_1')));
    dates.push(JSON.parse(localStorage.getItem('calendar_2')));
    dates.push(JSON.parse(localStorage.getItem('calendar_3')));
    // console.log(dates);
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
      data: $(this).serialize() + '&formBody=ЗАЯВКА НА БРОНИРОВАНИЕ БАНКЕТНОГО ЗАЛА' + '\nИмя и контактные данные: ' + msg + '\nЗал №1: ' + dates[3] + '\nЗал №2: ' + dates[4] + '\nЗал №3: ' + dates[5],
      success: function (answer) {
        $('#userContact').val(answer);
      }
    });
    return false;
  });
  $('body').delegate('#fMenuReservation', 'submit', function () {
    var msg  = $("#userContact").val();
    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      alert("Введите контактные данные, пожалуйста.");
      return false;
    }
    var cartItems = cart.getItems();
    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data: $(this).serialize() + '&formBody=Имя и контактные данные: ' + msg + '\nМЕНЮ\n' + cartItems,
      success: function (answer) {
        $('#userContact').val(answer);
      }
    });
    return false;
  });
}

// Разобраться с порядком показа и анимацией
function modalWindow() {
  // var navWidth = $('nav').css('width');
  $(".js-showPopup").click(function () {
    var popupName = $(this).attr("data-popupName");
    var vOverlay = '<div id="popup_overlay" class="overlay grey"> \
      <div class="overlay--close-btn"></div> \
      </div> \
      <div id="spinner" class="spinner" style="display:none;"> \
      <span class="fa fa-spinner fa-pulse"></span></div>';
    var vPopup = '<div class="popup"></div>';

    $('body').append(vOverlay);
    $('body').append(vPopup);

    $("#popup_overlay").toggleClass("visible");

    $('body').css('width', $('body').css('width'));
    // $('nav').css('width', navWidth);
    $("body").toggleClass("no-overflow");
    // $("#spinner").show();
    loader();
    disable_scroll();
    switch (popupName) {
    case "reservation":
      $('.popup').addClass('gold popup-menu_window');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createCalendarSlider();
        initCalendar('');
        enable_scroll();
      });
      break;
    case "menu":
      cart.showWinow();
      // $('.popup').addClass('gold popup-menu_window');
      // $(".popup").load("popupWindows/" + popupName + ".html", function() {
      //     createCart(this);
      //     enable_scroll(this);
      //   });
      break;
    case "news":
      $('.popup').addClass('gold popup-menu_window');
      $(".popup").load("popupWindows/" + popupName + ".php", function () {
        enable_scroll();
      });
      break;
    case "photos_building":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "photos_rooms":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "photos_about":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "photos_services":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "photos_restaurant":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "photos_menu":
      $('.popup').addClass('popup-photos no-overflow');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    case "services-1":
      $('.popup').addClass('gold popup-center');
      $(".popup").load("popupWindows/" + popupName + ".html", function () {
        createPhotoSlider();
      });
      break;
    default:
    // временная заглушка для пустых модальных окон, переделать
      var fadeOutDelay = 225;
      $('.popup').toggleClass('visible', false);
      $('#popup_overlay').toggleClass('visible');
      enable_scroll();
      setTimeout(function () {
        $('body').css('width', 'auto');
        $('body').toggleClass('no-overflow', false);
      }, fadeOutDelay);
      setTimeout(function () {
        enable_scroll();
        $('.popup').remove();
        $('#spinner').remove();
        $('#popup_overlay').remove();
      }, fadeOutDelay);
      break;
    }
    $(".popup").toggleClass("visible", true);
  });

  $('body').delegate('#popup_overlay', 'click', function () {
    var fadeOutDelay = 225;
    $(".popup").toggleClass("visible", false);
    $("#popup_overlay").toggleClass("visible");
    enable_scroll();
    setTimeout(function () {
      $("body").css('width', 'auto');
      $("body").toggleClass("no-overflow", false);
    }, fadeOutDelay);
    setTimeout(function () {
      enable_scroll();
      $('.popup').remove();
      $('#spinner').remove();
      $('#popup_overlay').remove();
    }, fadeOutDelay);
  });
}

// {createSliders
//  отзывы
function createReviewsSlider() {
  $('.cd-testimonials-wrapper').flexslider({
    selector: ".cd-testimonials > li",
    animation: "slide",
    controlNav: false,
    slideshow: false,
    smoothHeight: true,
    start: function () {
      $('.cd-testimonials').children('li').css({
        'opacity': 1,
        'position': 'relative'
      });
    }
  });
}

//  фотографии
function createPhotoSlider() {
  $('.cd-photoslider-wrapper').flexslider({
    selector: ".cd-photoslider > div",
    animation: "slide",
    controlNav: false,
    slideshow: false,
    start: function () {
      $('.cd-photoslider').children('div').css({
        'opacity': 1,
        'position': 'relative'
      });
    }
  });
}

function createCalendarSlider() {
  $('.cd-calendar-wrapper').flexslider({
    selector: ".cd-calendar > li",
    animation: "slide",
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    start: function () {
      $('.cd-calendar').children('li').css({
        'opacity': 1,
        'position': 'relative'
      });
    }
  });
}
// createSliders}

// {hack scroll for modal
function disable_scroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  document.ontouchmove = function (e) {
    e.preventDefault();
  };
}

function enable_scroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  document.ontouchmove = function () {
    return true;
  };
}

var keys = [37, 38, 39, 40];
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function keydown(e) {
  var i = keys.length;
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
// hack scroll for modal}

// {showAjaxSpinner
function loader() {
  $(document).ajaxStart(function () {
    $("#spinner").show();
  });
  $(document).ajaxComplete(function () {
    $("#spinner").hide();
  });
}
// showAjaxSpinner}

// {stickNavigationBar
function stickyNavigation() {
  $(window).on('scroll', function () {
    var e = window.pageYOffset;
    var t = $('.top_nav');
    t[e > 200 ? 'addClass' : 'removeClass']('top_nav-sticky');
    var n = $('.top_nav--logo-ribbon');
    n[e > 200 ? 'addClass' : 'removeClass']('top_nav--logo-ribbon-sticky');
  });
}
// stickNavigationBar}

//  {smoothScrolling
function smoothScroll() {
  $('a[href^="#"], a[href^="."]').click(function () {
  // если в href начинается с # или ., то ловим клик
    var scroll_el = $(this).attr('href');
    // возьмем содержимое атрибута href
    if ($(scroll_el).length !== 0) {
    // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 350); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });
}
// smoothScrolling}

// {iOS hack to change vh to px
var iOS = navigator.userAgent.match(/(iPod|iPhone)/);
function iosVhHeightBug() {
  var height = $(window).height();
  $('.top').css('min-height', height * 1.25 + 'px');
  $('.top').css('max-height', height * 1.25 + 'px');
  $('.spacer').css('padding-top', height * 0.55 + 'px');
}
if (iOS) {
  iosVhHeightBug();
  $(window).bind('resize', iosVhHeightBug);
}
// iOS hack to change vh to px}

