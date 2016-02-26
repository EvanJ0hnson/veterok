<?php
  $id = $_REQUEST['id'];

  $newItems = explode(',', $_REQUEST['message']);

  if ($newItems[0] == "") {
    unset($newItems[0]);
  }

  $calendar_filePath = '../data/calendar-room_'.$id.'.json';

  $fp = fopen($calendar_filePath, 'w');
  flock ($fp, LOCK_EX);
  fwrite($fp, json_encode($newItems));
  flock($fp, LOCK_UN);
  fclose($fp);
  echo "SUCCESS";
?>
