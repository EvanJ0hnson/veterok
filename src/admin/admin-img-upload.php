<?php include 'admin-config.php';?>
<html>
<head>
  <title>Результат загрузки файла</title>
  <script>
    setTimeout("location.href='admin-imgManager.php'",750);
  </script>
</head>
<body>
  <?php
    if($_FILES["filename"]["size"] > 1024*3*1024) {
     echo ("Размер файла превышает три мегабайта");
     exit;
    }
    if(is_uploaded_file($_FILES["filename"]["tmp_name"])) {
     move_uploaded_file($_FILES["filename"]["tmp_name"], "../photo/top/".$_FILES["filename"]["name"]);
     echo("Файл загружен");
    } else {
      echo("Ошибка загрузки файла");
    }
  ?>
</body>
</html>