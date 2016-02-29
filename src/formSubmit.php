<?php
header("Content-Type: text/html; charset=utf-8");

$ANSWER_REVIEW = 'Сообщение отправлено, спасибо за ваш отзыв!';
$ANSWER_RESERVATION = 'Спасибо за заявку, мы вам перезвоним!';
$SUBJECT_REVIEW = 'отзыв';
$SUBJECT_MENU_RESERVATION = 'заказ банкетного меню';
$SUBJECT_HALL_RESERVATION = 'бронирование банкетного зала';
$ERROR = 'Извините, сообщение не отправлено — техническая неполадка';
$EMPTY_BODY = 'Введите текст';

$event = $_REQUEST['event'];
$body = $_REQUEST['formBody'];

$to = 'ivangerasimow@gmail.com';

switch ($event) {
  case 'SendReview':
    $answer = $ANSWER_REVIEW;
    $subject = '«Ветерок», '.$SUBJECT_REVIEW;
    break;
  case 'sendMenuReservation':
    $answer = $ANSWER_RESERVATION;
    $subject = '«Ветерок», '.$SUBJECT_MENU_RESERVATION;
    break;
  case 'fHallReservation':
    $answer = $ANSWER_RESERVATION;
    $subject = '«Ветерок», '.$SUBJECT_HALL_RESERVATION;
    break;
  default:
    $answer = 'empty';
    $subject = '«Ветерок»';
    break;
}

if ($body != ''){
	if (mail ($to, $subject, $body)){
		echo $answer;
	}
	else {
		echo $ERROR;
	}
} else {
    echo $EMPTY_BODY;
  }
?>