<html>
<head>
  <meta charset="utf-8">
  <title>Новости</title>
  <?php
    include ("config.php");
  ?>
<body>
  <?php
    if (file_exists('data/news.txt')) {
      $news = file('data/news.txt') or exit('<b>Новостей нет</b>');
    } else {
        $fp = @fopen('data/news.txt','w') or exit('Ошибка');
        fclose($fp);
      }
    if ($news) {
      foreach(array_reverse($news) as $item) {
         echo $item;
      }
      unset ($item);
    }
  ?>
</body>
</html>

