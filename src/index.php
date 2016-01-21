<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Гостиница «Ветерок»</title>
  <!-- css -->
  <link rel="stylesheet" href="css/vendor.min.css">
  <link rel="stylesheet" href="css/bundle.min.css">
  <!-- css -->
</head>
<body>

  <nav class="top_nav">
    <a href="#top"><img class="top_nav--logo-square" src="img/logo_transp.png" alt="«Ветерок»"></a>
    <a href="#top"><img class="top_nav--logo-ribbon" src="img/logo.png" alt="«Ветерок»"></a>
    <ul class="u-float--right">
     <li class="nav-item"><a class="nav-link" href="#about">О НАС</a></li>
     <li class="nav-item"><a class="nav-link" href="#services">УСЛУГИ</a></li>
     <li class="nav-item"><a class="nav-link" href="#menu">МЕНЮ</a></li>
     <li class="nav-item"><a class="nav-link" href="#photos">ФОТОГРАФИИ</a></li>
     <li class="nav-item"><a class="nav-link" href="#reviews">ОТЗЫВЫ</a></li>
     <li class="nav-item"><a class="nav-link" href="#contacts">КОНТАКТЫ</a></li>
    </ul>
  </nav>

  <div id="top" class="top">
      <div class="cd-topslider-wrapper">
      <div class="cd-topslider">
        <div style="background-image: url(img/background-main-cropped.jpg);"></div>
        <?php
        foreach (glob("photo/top/*.jpg") as $Picture) {
          echo '<div style="background-image: url('.$Picture.');"></div>';
        }
        ?>
      </div>
    </div>
  </div>

  <div id="reservation" class="top__reservation red">
    <a data-popupName="reservation" class="btn btn--top js-showPopup">
      <h1 class="btn--top--heading">Забронировать</h1>
      <p class="btn--top--subheading">Номер или банкетный зал</p>
    </a>
  </div>

  <div id="about" class="sc__main--transparent">
    <div class="container gold">
        <img src="photo/small-1.jpg" alt="" class="sc-image sc-image--about sc-image--left js-showPopup wow fadeIn" data-popupName="photos" data-photoFolder="about">
      <h1 class="sc-heading gold__heading"><span class="gold__heading-background">О нас</span></h1>
      <p class="sc-paragraph">Ресторанно-гостиничный комплекс «Ветерок» пользуется популярностью среди проезжающих и не только. Так, например, у нас регулярно проводят банкеты гости из близлежащих населенных пунктов и городов.</p>
      <p class="sc-paragraph">Мы являемся представителями соотношения цены и качества. Наши работники регулярно проходят стажировку у профессионалов.</p>
      <p class="sc-paragraph">Наши повара могут удовлетворить любой, даже самый взыскательный вкус, приготовить любое блюдо по вашему пожеланию или рецепту.</p>
      <p class="sc-paragraph">Наш комплекс всегда, в любое время года и суток встретит Вас дружеской улыбкой, прохладой в знойные летние дни и теплым уютом в зимние стужи и конечно мы всегда готовы накормить Вас вкуснейшими блюдами и предложить уютные номера в гостинице.</p>
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
      <div class="u-text-align--right">
        <a data-popupName="news" class="js-showPopup btn btn--gold btn--mainType">Все новости</a>
      </div>
    </div>
  </div>

  <div id="services" class="sc__main red">
    <div class="container">
    <img src="photo/small-2.jpg" alt="" class="sc-image sc-image--services sc-image--right js-showPopup wow fadeIn" data-popupName="photos" data-photoFolder="services">
    <h1 class="sc-heading">У нас вы можете</h1>
    <ul class="sc-list-items">
      <li class="sc-list-item">Отдохнуть в комфортной обстановке</li>
      <li class="sc-list-item">Вкусно поесть в ресторане</li>
      <li class="sc-list-item">Посетить баню при гостинице</li>
      <li class="sc-list-item">Устроить праздник в одном из банкетных залов</li>
      <li class="sc-list-item">Поиграть в бильярд с друзьями</li>
      <li class="sc-list-item">Стать еще более красивыми посетив наш салон красоты</li>
      <li class="sc-list-item">Заказать «на вынос»</li>
      <li class="sc-list-item">Приобрести продукты первой необходимости, а так же приобрести наши фирменные полуфабрикаты высочайшего качества</li>
      <li class="sc-list-item">Помыть и отремонтировать Ваше авто</li>
    </ul>
    </div>
  </div>

  <div id="menu" class="sc__main--transparent">
    <div class="container gold">
      <img src="photo/small-3.jpg" alt="" class="sc-image sc-image--menu sc-image--left js-showPopup wow fadeIn" data-popupName="photos" data-photoFolder="restaurant">
      <h1 class="sc-heading gold__heading"><span class="gold__heading-background">Ресторан</span></h1>
      <p class="sc-paragraph">Если вы решили провести незабываемый романтический вечер или весело отдохнуть компанией – смело направляйтесь в ресторан гостиницы «Ветерок»!</p>
      <p class="sc-paragraph">Здесь вас приятно удивят великолепные блюда, их оригинальное оформление и подача. Изысканное меню, богатая карта вин, способная удовлетворить разнообразные вкусы самых требовательных гостей и высокий сервис обслуживания обязательно поднимут вам настроение!</p>
      <div class="u-text-align--right">       
        <a class="js-showPopup btn btn--gold btn--mainType btn--menu" data-popupName="photos" data-photoFolder="menu">Ознакомиться с меню</a>
        <a class="js-showMenuPage btn btn--gold btn--mainType btn--menu" data-popupName="menu" href="menu.php">Составить меню банкета</a>
      </div>
    </div>
  </div>

  <div id="photos" class="sc__main red">
  <div class="container">
    <div class="cd-photoslider-wrapper">
      <div class="cd-photoslider main--slider">
        <?php
          foreach (glob("photo/main/*.*") as $Picture) {
            echo '<div style="background-image: url('.$Picture.');"></div>';
          }
        ?>
      </div>
    </div>
    <div class="u-text-align--center">
      <a class="js-showPopup btn btn--red btn--mainType btn--photos" data-popupName="photos" data-photoFolder="building">Фотографии комплекса</a>
      <a class="js-showPopup btn btn--red btn--mainType btn--photos" data-popupName="photos" data-photoFolder="rooms">Фотографии номеров</a>
    </div>
  </div>
  </div>

 <div id="reviews" class="sc__main--transparent">
    <div class="container">
    <h1 class="sc-heading gold__heading"><span class="gold__heading-background">Отзывы</span></h1>
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
      <div class="ft-block u-float--left">
          <h1 class="ft-heading">Гостинично-ресторанный комплекс «Ветерок»</h1>
          <p class="ft-paragraph">Волжский район, с. Подъем-Михайловка, (трасса Урал - Самара) ул. Советская, 37</p>
          <p class="ft-paragraph">(846) 997-87-37</p>
          <p class="ft-paragraph">veterok_spn@mail.ru</p>
      </div>
      <div class="ft-block u-float--left">
        <form id="fSendReview">
          <textarea class="form-review__message" id="reviewText" name="formBody" placeholder="Здесь вы можете оставить отзыв о гостинице. Не забудьте представиться. Спасибо!" required></textarea>
          <button class="btn btn--red btn--mainType btn--sendReview" type="submit" name="sendReview">Отправить</button>
          <input type="hidden" name="event" value="SendReview">
        </form>
      </div>
      <h1 class="ft-heading">Как к нам добраться</h1>
      <iframe src="https://www.google.ru/maps/embed?pb=!1m16!1m12!1m3!1d19290.2044802909!2d50.52257565987898!3d52.817396981649324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KHQsNC80LDRgNCwLCDQn9C-0LTRitC10Lwt0JzQuNGF0LDQudC70L7QstC60LA!5e0!3m2!1sru!2sru!4v1426198644037" width="100%" height="450" frameborder="0" style="border:0;" class="wow fadeIn"></iframe>
    </div>
  </footer>

  <!-- javascript -->
  <script src="js/bundle.min.js"></script>
  <!-- javascript -->
</body>
</html>
