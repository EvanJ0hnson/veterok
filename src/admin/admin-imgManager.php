<html>
<head>
  <title>Загрузка файлов на сервер</title>
  <?php include 'admin-config.php';?>
</head>
<body>
  <?php include 'admin-navigation.php';?>
  <div class="admin__page-wrapper">
    <h1 class="admin__section-title">Новый слайд</h1>
    <form action="admin-img-upload.php" method="post" enctype="multipart/form-data">
      <input class="form-slider__file-upload" type="file" name="filename">
      <button type="submit" class="admin__btn-blue">Добавить</button>
    </form>
    <h1 class="admin__section-title">Удалить</h1>
    <?php
    echo '<form action="admin-img-delete.php" method="post">';
    foreach (glob("../photo/top/*.*") as $Picture) {
      echo '<input class="form-slider__img-checkbox" type="checkbox" name="img[]" value="'.$Picture.'"> '.$Picture.'<br>';
    }
    
    echo '<button class="admin__btn-blue" type="submit">Удалить выбранные</button>';
    echo '</form>';
    ?>
  </div>
</body>
</html>