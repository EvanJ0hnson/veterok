<?php
  include "config.php";
  $news = file('data/news.txt');
  $news_count = count($news);

  if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $news_json = json_decode(file_get_contents('data/news.json'));
    unset($news_json[$id]);
    $news_json = array_values($news_json);

    // var_dump(json_encode($news_json));

    $fp = fopen('data/news.json', 'w');
    flock ($fp, LOCK_EX);
    fwrite($fp, json_encode($news_json));
    flock($fp, LOCK_UN);
    fclose($fp);

    Header('Location: ./admin.php');
    exit;
  }
  // if (isset($_GET['id'])) {
  //   $id=$_GET['id'];

  //   $fp = fopen("data/news.txt","w");
  //   flock ($fp, LOCK_EX);
  //   unset($news[$id]);
  //   fputs($fp, implode("", $news));
  //   flock($fp, LOCK_UN);
  //   fclose($fp);

  //   Header('Location: ./admin.php');
  //   exit;
  // }
  // в input используется require, не поддерживается на iOS.
  // Fallback для iOS в status.php
  print'
    <html>
    <head>
    <title>'.$gname.'</title>
    </head>
    <body>
      <form id="addNews" action="status.php" method=post></form>
      <table>
        <tbody>
          <tr>
            <td><b>Всего новостей: '.$news_count.'</b></td>
          </tr>
        </tbody>
      </table>
      <br>
      <table>
        <thead>
          <tr>
            <td><b>Добавить новость</b></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Заголовок:</td>
            <td><input type="text" form="addNews" name="title" required></td>
          </tr>
          <tr>
            <td>Текст:</td>
            <td><textarea rows=4 form="addNews" name="text" required></textarea></td>
          </tr>
          <tr>
            <td><button type="submit" form="addNews">Добавить</button></td>
          </tr>
        </tbody>
      </table>
      <br>
      <table>
        <tr>
          <td><B>Все новости</B></td>
        </tr>
      </table>';

  // foreach(array_reverse($news) as $item) {
  //    print $item;
  //    $id = --$news_count;
  //    print'
  //    <table>
  //      <tbody>
  //        <tr>
  //          <td><a href="admin.php?id='.$id.'">Удалить</a></td>
  //        </tr>
  //      </tbody>
  //    </table>';
  // }
  // unset($item);
  // unset($id);

  $news_json = json_decode(file_get_contents('data/news.json'));
  $news_json_count=count($news_json);
  foreach(array_reverse($news_json) as $item_json) {
     print '<div>'.$item_json->{'title'}.'</div>
            <div>'.$item_json->{'date'}.'</div>
            <div>'.$item_json->{'body'}.'</div>';
     $id_json = --$news_json_count;
     print'<a href="admin.php?id='.$id_json.'">Удалить новость</a></td>';
  }

  print'
      </body>
    </html>';

  unset($item_json);
  unset($id_json);
?>