<html>
<head>
  <meta charset="utf-8">
  <title>Подождите...</title>
  <script language="javascript" type="text/javascript">
    setTimeout("location.href='admin-news.php'",0);
  </script>
</head>
<body>
  <?php
    header('Content-Type: text/html; charset=utf-8');

    // Fallback проверки значений для iOS (и возможно Android)
    if ((strlen(rtrim($_POST['title'])))!=0) {
      $title=htmlspecialchars($_POST['title'], ENT_QUOTES);
    } else {
        exit('<b>Имя не введено</b>');
      }

    if ((strlen(rtrim($_POST['text'])))!=0) {
      $text=htmlspecialchars($_POST['text'], ENT_QUOTES);
    } else {
        exit('<b>Новость не введена</b>');
      }

    //Если проверки пройдены
    $news = json_decode(file_get_contents('../data/news.json'));
    // if (!$news)
      // exit('Невозможно открыть файл');
    $date = date('d.m.y | H:i');
    $news_count=count($news);

    $news[$news_count]->{'title'} = $title;
    $news[$news_count]->{'date'} = $date;
    $news[$news_count]->{'body'} = $text;

    $fp = fopen('../data/news.json', 'w');
    flock ($fp, LOCK_EX);
    fwrite($fp, json_encode($news));
    flock($fp, LOCK_UN);
    fclose($fp);

    exit('<b>Новость добавлена</b>');
  ?>
</body>
</html>