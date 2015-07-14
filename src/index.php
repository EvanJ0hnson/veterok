<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name=viewport content="width=960">
  <title>Гостиница «Ветерок»</title>
  <!-- css -->
  <!-- dev-vendor -->
  <link rel="stylesheet" href="css/vendor/reset.css">
  <link rel="stylesheet" href="css/vendor/font-awesome.css">
  <link rel="stylesheet" href="css/vendor/animate.css">
  <!-- dev-partials -->
  <link rel="stylesheet" href="css/partials/slider.css">
  <link rel="stylesheet" href="css/partials/navigation.css">
  <link rel="stylesheet" href="css/partials/sections.css">
  <link rel="stylesheet" href="css/partials/footer.css">
  <link rel="stylesheet" href="css/partials/menu.css">
  <link rel="stylesheet" href="css/partials/modal.css">
  <link rel="stylesheet" href="css/partials/btn.css">
  <link rel="stylesheet" href="css/partials/form.css">
  <link rel="stylesheet" href="css/partials/calendar.css">
  <link rel="stylesheet" href="css/partials/colors.css">
  <link rel="stylesheet" href="css/partials/cart.css">
  <link rel="stylesheet" href="css/partials/style.css">
  <!-- build -->
  <!-- <link rel="stylesheet" href="css/main.min.css"> -->
  <!-- css -->
</head>
<body>

  <nav class="top_nav">
    <a href="#top"><img class="top_nav--logo-square" src="img/logo_transp.png" alt="«Ветерок»"></a>
    <a href="#top"><img class="top_nav--logo-ribbon" src="img/!logo.png" alt="«Ветерок»"></a>
    <ul class="floatRight">
     <li class="nav-item"><a class="nav-link" href="#about">О НАС</a></li>
     <li class="nav-item"><a class="nav-link" href="#services">УСЛУГИ</a></li>
     <li class="nav-item"><a class="nav-link" href="#menu">МЕНЮ</a></li>
     <li class="nav-item"><a class="nav-link" href="#photos">ФОТОГРАФИИ</a></li>
     <li class="nav-item"><a class="nav-link" href="#reviews">ОТЗЫВЫ</a></li>
     <li class="nav-item"><a class="nav-link" href="#contacts">КОНТАКТЫ</a></li>
    </ul>
  </nav>

  <div id="top" class="top wow fadeIn">
      <div class="cd-topslider-wrapper">
      <div class="cd-topslider">
        <div style="background-image: url(img/background-main-cropped.jpg);"></div>
        <div style="background-image: url(photo/2.jpg);"></div>
      </div>
    </div>
  </div>

  <div id="reservation" class="top__reservation red">
    <a data-popupName="reservation" class="btn btn--top wow fadeIn js-showPopup">
      <h1 class="btn--top--heading">забронировать</h1>
      <p class="btn--top--subheading">номер или банкетный зал</p>
    </a>
  </div>

  <div id="about" class="sc__main--transparent">
    <div class="container gold">
        <img src="photo/small-1.jpg" alt="" class="sc-image sc-image--about sc-image--left js-showPopup wow fadeInUp" data-popupName="photos_about">
      <h1 class="sc-heading gold__heading"><span class="gold__heading-background">О гостинице</span></h1>
      <p class="sc-paragraph">Гостиница и кафе пользуются большой популярностью у дальнобойщиков и проезжающих мимо туристов.</p>
      <p class="sc-paragraph">В гостинице имеются 16 номеров. Рядом находится шиномонтаж, автосервис, магазин автозапчастей и автосауна.</p>
      <h1 id="news" class="sc-subheading gold__heading"><span class="gold__heading-background">Новости</span></h1>
      <div class="sc-news">
        <?php
        $news = json_decode(file_get_contents('data/news.json'));
        if ($news) {
          for($i = (count($news) - 1); $i >= (count($news) - 3); $i--) {
             print '<div class="sc-news-item">
                  <p class="sc-news-title">'.$news[$i]->{'title'}.'</p>
                  <p class="sc-news-date">'.$news[$i]->{'date'}.'</p>
                  <p class="sc-news-text">'.$news[$i]->{'body'}.'</p>
                  </div>';
          }
        } else echo '<p class="sc-paragraph">Новостей нет</p>';
        ?>
      </div>
      <a data-popupName="news" class="js-showPopup btn btn--gold btn--mainType floatRight wow fadeIn">Все новости</a>
    </div>
  </div>

  <div id="services" class="sc__main red">
    <div class="container">
    <img src="photo/small-2.jpg" alt="" class="sc-image sc-image--services sc-image--right js-showPopup wow fadeInUp" data-popupName="photos_services">
    <h1 class="sc-heading">у нас вы можете</h1>
    <ul class="sc-list-items">
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-1">Отдохнуть в комфортной обстановке</a>
      </li>
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-2">Вкусно поесть в ресторане</a>
      </li>
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-3">Посетить баню при гостинице</a>
      </li>
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-4">Устроить праздник в одном из банкетных залов</a>
      </li>
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-5">Получить информацию по проезду к определенным местам в городе и времени работы транспорта</a>
      </li>
      <li class="sc-list-item">
        <a class="sc-list-link js-showPopup" data-popupName="services-6">Узнать о расположении ближайших мест отдыха, ресторанов, кинотеатров</a>
      </li>
    </ul>
    </div>
  </div>

  <div id="menu" class="sc__main--transparent">
    <div class="container gold">
      <img src="photo/small-3.jpg" alt="" class="sc-image sc-image--menu sc-image--left js-showPopup wow fadeInUp" data-popupName="photos_restaurant">
      <h1 class="sc-heading gold__heading"><span class="gold__heading-background">ресторан</span></h1>
      <p class="sc-paragraph">Если вы решили провести незабываемый романтический вечер или весело отдохнуть компанией – смело направляйтесь в ресторан гостиницы «Ветерок»!</p>
      <p class="sc-paragraph">Здесь вас приятно удивят великолепные блюда, их оригинальное оформление и подача. Изысканное меню, богатая карта вин, способная удовлетворить разнообразные вкусы самых требовательных гостей и высокий сервис обслуживания обязательно поднимут вам настроение!</p>
      <a class="js-showMenuPage btn btn--gold btn--mainType btn--menu floatRight wow fadeIn" data-popupName="menu" href="menu.php">Составить меню банкета</a>
      <a class="js-showPopup btn btn--gold btn--mainType btn--menu floatRight wow fadeIn" data-popupName="photos_menu">Ознакомиться с меню</a>
      <!-- <div class=""></div> -->
    </div>
  </div>

  <div id="photos" class="sc__main red">
  <div class="container">
    <div class="cd-photoslider-wrapper">
      <div class="cd-photoslider main--slider">
        <div style="background-image: url(photo/1.jpg);"></div>
        <div style="background-image: url(photo/2.jpg);"></div>
      </div>
    </div>
      <a class="js-showPopup btn btn--red btn--mainType btn--photos floatLeft wow fadeIn" data-popupName="photos_building">Фотографии комплекса</a>
      <a class="js-showPopup btn btn--red btn--mainType btn--photos floatRight wow fadeIn" data-popupName="photos_rooms">Фотографии номеров</a>
  </div>
  </div>

 <div id="reviews" class="sc__main--transparent">
    <div class="container">
    <h1 class="sc-heading gold__heading"><span class="gold__heading-background">отзывы</span></h1>
      <div class="cd-testimonials-wrapper">
        <ul class="cd-testimonials">
          <li>
            <p>Достоинства: Номера с удобствами, недорого, есть кафе.</p>
            <p>В январе 2014г. были в командировке в Самарской области. К нашему удовольствию, рабочий объект находился в нескольких километрах от села Подъем-Михайловка. На удивление гостиничный комплекс в селе оказался гораздо лучше многих городских. Гостиница недорогая (самый дорогой двухкомнатный люкс стоит всего 1200 руб), номера с удобствами, телевизор, холодильник, фен, удобные кровати, необходимая мебель, тапочки и халаты для гостей. Очень приличное кафе, готовят хорошо, особенно блинчики. Есть ресторан, сауна. Особенно хочется отметить (большое спасибо за это администрации) наличие в гостинице массажных кресел! После работы - это огромное удовольствие! Гостиница находится на трассе Самара-Оренбург, если вы оказались поблизости, не ищите места лучше!</p>
            <p>Общее впечатление: Понравилось.</p>
            <div class="cd-author">
              <ul class="cd-author-info">
                <li>Ксения Алфёрова</li>
                <li>Управляющая, ООО «МакИнвест»</li>
              </ul>
            </div>
          </li>
          <li>
            <p>Есть ресторан, сауна. Особенно хочется отметить (большое спасибо за это администрации) наличие в гостинице массажных кресел! После работы - это огромное удовольствие! Гостиница находится на трассе Самара-Оренбург, если вы оказались поблизости, не ищите места лучше!</p>
            <p>Общее впечатление: Понравилось.</p>
            <div class="cd-author">
              <ul class="cd-author-info">
                <li>Ксения Алфёрова</li>
                <li>Управляющая, ООО «МакИнвест»</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <footer id="contacts" class="sc__main red">
    <div class="container clearfix">
      <div class="ft-block floatLeft">
          <h1 class="ft-heading">Гостинично-ресторанный комплекс «Ветерок»</h1>
          <p class="ft-paragraph">Волжский район, с. Подъем-Михайловка, (трасса Урал - Самара) ул. Советская, 37</p>
          <p class="ft-paragraph">(846) 997-87-37</p>
          <p class="ft-paragraph">veterok_spn@mail.ru</p>
      </div>
      <div class="ft-block floatLeft">
        <form id="fSendReview">
          <textarea id="reviewText" name="formBody" placeholder="Здесь вы можете оставить отзыв о гостинице. Не забудьте представиться. Спасибо!" required></textarea>
          <button type="submit" name="sendReview" class="btn btn--red btn--mainType btn--sendReview wow fadeIn">Отправить</button>
          <input type="hidden" name="event" value="SendReview">
        </form>
      </div>
      <h1 class="ft-heading">Как к нам добраться</h1>
      <iframe src="https://www.google.ru/maps/embed?pb=!1m16!1m12!1m3!1d19290.2044802909!2d50.52257565987898!3d52.817396981649324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KHQsNC80LDRgNCwLCDQn9C-0LTRitC10Lwt0JzQuNGF0LDQudC70L7QstC60LA!5e0!3m2!1sru!2sru!4v1426198644037" width="100%" height="450" frameborder="0" style="border:0;" class="wow fadeInLeft"></iframe>
    </div>
  </footer>

  <!-- javascript -->
  <!-- dev-vendor -->
  <script src="js/vendor/jquery.min.js"></script>
  <script src="js/vendor/modernizr.js"></script>
  <script src="js/vendor/jquery.flexslider-min.js"></script>
  <script src="js/vendor/wow.min.js"></script>
  <!-- dev-partials -->
  <script src="js/partial/cart.js"></script>
  <script src="js/partial/calendar.js"></script>
  <script src="js/partial/scripts.js"></script>
  <script>
    $(function(){
      stickyNavigation();
      smoothScroll();
      createTopSlider();
      createReviewsSlider();
      createPhotoSlider();
      modalWindow();
      formSubmit();
      // new WOW().init();
    })
  </script>
  <!-- javascript -->
</body>
</html>