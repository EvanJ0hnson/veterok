/**
 * updateReservations (admin page)
 */
export default function updateReservations() {
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
      success(response) {
        console.log(response);
      }
    });
  });
}
