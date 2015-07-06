<?php include 'admin-config.php';?>
<html>
<head>
  <title>Загрузка файлов на сервер</title>
  <!-- <link rel="stylesheet" href="../css/vendor/font-awesome.css"> -->
  <link rel="stylesheet" href="../css/partials/admin.css">
</head>
<body>
  <div class="container">
    <?php include 'admin-navigation.php';?>
    <h1 class="news_block-title">Загрузка слайдов</h1>
    <form action="admin-img-upload.php" method="post" enctype="multipart/form-data">
      <input type="file" name="filename">
      <button type="submit" class="btn-delete">Загрузить изображение</button>
    </form>
    <h1 class="news_block-title">Удаление слайдов</h1>
    <?php
    echo '<form action="admin-img-delete.php" method="post">';
    foreach (glob("../photo/top/*.*") as $Picture) {

      echo '<input type="checkbox" name="img[]" value="'.$Picture.'"> '.$Picture.'<br>';
    }
    echo '<button type="submit" class="btn-delete">Удалить выбранные</button>';
    echo '</form>';
    ?>
  </div>
</body>
</html>