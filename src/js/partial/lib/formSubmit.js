/**
 * [formSubmit description]
 * @return {[type]} [description]
 */
export default function formSubmit() {
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
  $('body').delegate('#fHallReservation', 'submit', (event) => {
    const msg = $('#userContact').val();
    const dates = [];
    let data = null;
    let formData = null;
    let formBody = null;

    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      $('#userContact').val('Введите контактные данные, пожалуйста.');
      return false;
    }

    dates.push(JSON.parse(localStorage.getItem('calendar_1')));
    dates.push(JSON.parse(localStorage.getItem('calendar_2')));
    dates.push(JSON.parse(localStorage.getItem('calendar_3')));

    if (!dates[0]) {
      dates[0] = '—';
    }
    if (!dates[1]) {
      dates[1] = '—';
    }
    if (!dates[2]) {
      dates[2] = '—';
    }

    formData = $(event.currentTarget).serialize();
    formBody = `&formBody=Заявка на бронирование банкетного зала: \nИмя и контактные данные: ${msg} \nЗал №1: ${dates[0]} \nЗал №2: ${dates[1]} \nЗал №3: ${dates[2]}`;
    data = formData + formBody;

    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data,
      success(response) {
        $('#userContact').val(response);
      }
    });
    return false;
  });

  $('body').delegate('#fMenuReservation', 'submit', (event) => {
    const msg = $('#userContact').val();
    const cartItems = JSON.parse(localStorage.getItem('cart-widjet'));
    let formattedCartItems = '';
    let data = null;
    let formData = null;
    let formBody = null;

    if (cartItems.length) {
      cartItems.forEach((item) => {
        formattedCartItems += `\r\n— ${item.name}, ${item.price} рублей (${item.num}шт)`;
      });
    } else {
      $('#userContact').val('Выберите блюда, пожалуйста.');
      return false;
    }

    if ((msg === '') || (msg === 'Спасибо за заявку, мы вам перезвоним!')) {
      $('#userContact').val('Введите контактные данные, пожалуйста.');
      return false;
    }

    formData = $(event.currentTarget).serialize();
    formBody = `&formBody=Имя и контактные данные: ${msg}\r\n\r\nЗаказ: ${formattedCartItems}`;
    data = formData + formBody;

    $.ajax({
      type: 'POST',
      url: scriptFilePath,
      data,
      success(response) {
        $('#userContact').val(response);
      }
    });
    return false;
  });
}
