<?php
  include 'admin-config.php';

  $news_filePath = '../data/news.json';
  $news = json_decode(file_get_contents($news_filePath));
  $news_count=count($news);

  if (isset($_GET['event'])) {
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

    $date = date('d.m.y | H:i');

    $news[$news_count]->{'title'} = $title;
    $news[$news_count]->{'date'} = $date;
    $news[$news_count]->{'body'} = $text;

    $fp = fopen($news_filePath, 'w');
    flock ($fp, LOCK_EX);
    fwrite($fp, json_encode($news));
    flock($fp, LOCK_UN);
    fclose($fp);

    Header('Location: ./admin-news.php');
    exit;
  }

  if (isset($_GET['id'])) {
    $id = $_GET['id'];

    unset($news[$id]);
    $news = array_values($news);

    $fp = fopen($news_filePath, 'w');
    flock ($fp, LOCK_EX);
    fwrite($fp, json_encode($news));
    flock($fp, LOCK_UN);
    fclose($fp);

    Header('Location: ./admin-news.php');
    exit;
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Новости</title>
    <link rel="stylesheet" href="../css/vendor/reset.css">
    <!-- <link rel="stylesheet" href="../css/vendor/normalize.css"> -->
    <link rel="stylesheet" href="../css/partials/admin.css">
  </head>
  <body>
    <div class="container">
    <?php
      include 'admin-navigation.php'
    ?>
    <div class="news_block-add">
      <h1 class="news_block-add-title">Добавить новость</h1>
      <form id="addNews" action="admin-news.php?event=add" method=post>
        <input type="text" name="title" placeholder="Заголовок" required>
        <button type="submit">Добавить</button>
        <textarea rows=4 name="text" placeholder="Текст" required></textarea>

        <!-- В input используется require, не поддерживается на iOS. -->
      </form>
    </div>
    <ul class="news_block-items">
      <h1 class="news_block-title">Все новости [<?php echo $news_count;?>]</h1>
      <?php
        foreach(array_reverse($news) as $item) {
          $id = --$news_count;
           print'
            <li class="news_block-item">
              <p class="news_block-item--title">'.$item->{'title'}.'</p>
              <a href="admin-news.php?id='.$id.'" class="btn-delete">Удалить</a>
              <p class="news_block-item--date">'.$item->{'date'}.'</p>
              <p class="news_block-item--body">'.$item->{'body'}.'</p>
            </li>';
        }
        unset($item);
        unset($id);
      ?>
    </ul>
    </div>
  </body>
</html>


