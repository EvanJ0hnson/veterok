<!DOCTYPE html>
<html>
<head>
  <?php include 'admin-config.php';?>
  <title>Бронирование</title>
</head>
<body>
  <?php include 'admin-navigation.php';?>
  <div class="admin__page-wrapper">
    <div class="admin__calendar-wrapper">
      <h2 class="admin__section-title">Банкетный зал №1</h2>
      <div id="calendar_1"></div>
      <button class="admin__btn-blue js-updateReservations" data-id="1">
        Сохранить
      </button>
    </div>
    <div class="admin__calendar-wrapper">
      <h2 class="admin__section-title">Банкетный зал №2</h2>
      <div id="calendar_2"></div>
      <button class="admin__btn-blue js-updateReservations" data-id="2">
        Сохранить
      </button>
    </div>
    <div class="admin__calendar-wrapper">
      <h2 class="admin__section-title">Банкетный зал №3</h2>
      <div id="calendar_3"></div>
      <button class="admin__btn-blue js-updateReservations" data-id="3">
        Сохранить
      </button>
    </div>
  </div>
</body>
</html>


