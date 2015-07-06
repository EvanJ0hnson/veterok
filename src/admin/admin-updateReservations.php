<?php
  // $message = $_REQUEST['message'];
  $id = $_REQUEST['id'];
  // if (strlen($message) == 0) {
  //   echo 'error::empty';
  //   exit;
  // }

  $newItems = explode(',', $_REQUEST['message']);

  $calendar_filePath = '../data/calendar-room_'.$id.'.json';
  // $calendar = json_decode(file_get_contents($calendar_filePath));

  // foreach ($newItems as $item) {
  //   $calendar[] = $item;
  // }

  $fp = fopen($calendar_filePath, 'w');
  flock ($fp, LOCK_EX);
  fwrite($fp, json_encode(array_keys(array_count_values($newItems))));
  flock($fp, LOCK_UN);
  fclose($fp);
  echo 'Выполнено';
?>