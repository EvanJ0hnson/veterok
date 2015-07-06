<?php include 'admin-config.php';?>
<!DOCTYPE html>
<html>
<head>
  <title>Бронирование</title>
  <!-- css -->
  <!-- <link rel="stylesheet" href="../css/vendor/reset.css"> -->
  <link rel="stylesheet" href="../css/vendor/font-awesome.css">
  <!-- <link rel="stylesheet" href="../css/vendor/normalize.css"> -->
  <link rel="stylesheet" href="../css/partials/admin.css">
  <!-- css -->
  <!-- javascript -->
  <!-- dev-vendor -->
  <script src="../js/vendor/jquery.min.js"></script>
  <!-- dev-partials -->
  <script src="../js/partial/calendar.js"></script>
  <script src="../js/partial/scripts.js"></script>
  <script>
    $(function(){
      initCalendar('true');
      updateReservations();
    });
  </script>
  <!-- javascript -->
</head>
<body>
  <div class="container">
    <?php include 'admin-navigation.php';?>
    <div class="displayInlineBlock">
      <h2 class="news_block-title">Банкетный зал №1</h2>
      <div id="calendar_1"></div>
      <button class="js-updateReservations" data-id="1">
        Сохранить
      </button>
    </div>
    <div class="displayInlineBlock">
      <h2 class="news_block-title">Банкетный зал №2</h2>
      <div id="calendar_2"></div>
      <button class="js-updateReservations" data-id="2">
        Сохранить
      </button>
    </div>
    <div class="displayInlineBlock">
      <h2 class="news_block-title">Банкетный зал №3</h2>
      <div id="calendar_3"></div>
      <button class="js-updateReservations" data-id="3">
        Сохранить
      </button>
    </div>
  </div>
</body>
</html>


