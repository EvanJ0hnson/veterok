<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name=viewport content="width=960">
  <title>Гостиница «Ветерок»</title>
  <!-- css -->
  <link rel="stylesheet" href="css/vendor.css">
  <link rel="stylesheet" href="css/styles.min.css">
  <!-- css -->
  
  <style media="print" type="text/css">
  .noprint {
    display: none;
  }
  .opacity100 {
    opacity: 0;
  }
  </style>
  <!-- css -->
  <!-- javascript -->
  <script src="js/vendor.js"></script>
  <script src="js/partial.js"></script>
  <script>
    $(function(){
      createCart ();
      smoothScroll();
      modalWindow();
      formSubmit();
    });
  </script>
  <!-- javascript -->
</head>
<body class="sc__main gold">
  <?php
    $menu_filePath = 'data/menu.json';
    $menu = json_decode(file_get_contents($menu_filePath));
    $menu_count=count($menu);
  ?>
  <nav class="top_nav top_nav-menu noprint">
    <a href="/"><img class="top_nav--logo-square" src="img/logo_transp.png" alt="«Ветерок»"></a>
    <ul class="floatRight">
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="/#about">О НАС</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="/#services">УСЛУГИ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="/#menu">МЕНЮ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="/#photos">ФОТОГРАФИИ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="/#reviews">ОТЗЫВЫ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link nav-link-menu" href="#contacts">КОНТАКТЫ</a>
      </li>
    </ul>
  </nav>

  <ul class="menu_nav gold--noBgImage noprint">
    <?php
      foreach($menu as $dish_type) {
        print '<li class="menu_nav-item">
            <a class="menu_nav-link" href="#header-'.$dish_type->{'type'}.'">'.$dish_type->{'title'}.'</a>
          </li>';
      }
    ?>
    <li class="menu_nav-item">
      <a id="cart-widjet" data-popupName="menu" class="js-showPopup btn btn--gold btn--cart"></a>
    </li>
  </ul>

  <div class="menu-container opacity100">
    <div class="gold--noBgImage">
      <?php
        foreach($menu as $dish_type) {
          print '
            <h1 id="header-'.$dish_type->{'type'}.'" class="sc-heading">'.$dish_type->{'title'}.'</h1>
            <div id="'.$dish_type->{'type'}.'" class="menu-items-container">';
            foreach($dish_type->{'items'} as $dish) {
              if (strlen($dish->{'photo'}) > 0) {
                $photo = '<img class="floatLeft" src="'.$dish->{'photo'}.'" alt="">';
              } else
                  $photo = '';
              print '
                <div class="menu-item">
                '.$photo.'
                <p class="menu-item--title clearfix">'.$dish->{'title'}.' <span class="menu-item--cal">('.$dish->{'calories'}.')</span></p>
                <p class="menu-item--ingredients">'.$dish->{'ingredients'}.'</p>
                <p class="menu-item--price">
                <button id="btnID'.$dish->{'id'}.'" class="btn btn--add" onclick="cart.addToCart(this, \''.$dish->{'id'}.'\', \''.$dish->{'title'}.'\', \''.$dish->{'price'}.'\', \'false\')">
                  <span class="fa fa-plus-circle"></span>
                </button>
                '.$dish->{'price'}.' <span class="fa fa-rub"></span></p>
                </div>';
            }
          print '</div>';
        }
      ?>
    </div>

    <footer id="contacts" class="sc__main red noprint">
      <div class="container clearfix">
        <div class="ft-block floatLeft">
            <h1 class="ft-heading">Гостинично-ресторанный комплекс «Ветерок»</h1>
            <p class="ft-paragraph">Волжский район, с. Подъем-Михайловка, (трасса Урал - Самара) ул. Советская, 37</p>
            <p class="ft-paragraph">(846) 997-87-37</p>
            <p class="ft-paragraph">veterok_spn@mail.ru</p>
        </div>
        <div class="ft-block floatLeft">
          <form id="fSendReview">
            <textarea id="reviewText" name="message" placeholder="Здесь вы можете оставить отзыв о гостинице. Не забудьте представиться. Спасибо!"></textarea>
            <button type="submit" name="sendReview" class="btn btn--red btn--mainType btn--sendReview">Отправить</button>
          </form>
        </div>
        <h1 class="ft-heading">Как к нам добраться</h1>
        <iframe src="https://www.google.ru/maps/embed?pb=!1m16!1m12!1m3!1d19290.2044802909!2d50.52257565987898!3d52.817396981649324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0KHQsNC80LDRgNCwLCDQn9C-0LTRitC10Lwt0JzQuNGF0LDQudC70L7QstC60LA!5e0!3m2!1sru!2sru!4v1426198644037" width="100%" height="450" frameborder="0" style="border:0;"></iframe>
      </div>
    </footer>
  </div>
</body>
</html>