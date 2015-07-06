<?php include 'admin-config.php';?>
<html>
<head>
  <title>Результат загрузки файла</title>
  <script>
    setTimeout("location.href='admin-imgManager.php'",0);
  </script>
</head>
<body>
  <?php
    $images = $_POST["img"];
    foreach ($images as $image) {
      unlink($image);
    }
  ?>
</body>
</html>