<?php
  $news_filePath = '../data/news.json';
  $news = json_decode(file_get_contents($news_filePath));
  $news_count=count($news);

  if (isset($_GET['event'])) {
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
    <?php include 'admin-config.php';?>
  </head>
  <body>
    <?php include 'admin-navigation.php'?>
    <div class="admin__page-wrapper">
    <div class="admin__news-add">
      <h1 class="admin__section-title">Добавить новость</h1>
      <form class="form-news" id="addNews" action="admin-news.php?event=add" method=post>
        <input class="form-news__title-input" type="text" name="title" placeholder="Заголовок" required>
        <button class="admin__btn-blue" type="submit">Опубликовать</button>
        <textarea class="form-news__message-input" rows=4 name="text" placeholder="Текст" required></textarea>
      </form>
    </div>
    
    <h1 class="admin__section-title">Все новости (<?php echo $news_count;?>)</h1>
    <ul class="admin-news">
      <?php
        foreach(array_reverse($news) as $item) {
          $id = --$news_count;
           print'
            <li class="admin-news__item">
              <p class="admin-news__item-title">'.$item->{'title'}.'</p>
              <a href="admin-news.php?id='.$id.'" class="admin__btn-delete">Удалить</a>
              <p class="admin-news__item-date">'.$item->{'date'}.'</p>
              <p class="admin-news__item-body">'.$item->{'body'}.'</p>
            </li>';
        }
        unset($item);
        unset($id);
      ?>
    </ul>
    </div>
  </body>
</html>


