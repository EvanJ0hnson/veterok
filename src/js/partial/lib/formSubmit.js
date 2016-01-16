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