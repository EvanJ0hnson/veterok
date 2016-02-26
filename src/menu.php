<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=960">
  <title>Гостиница «Ветерок»</title>
  <!-- css -->
  <link rel="stylesheet" href="css/vendor.min.css">
  <link rel="stylesheet" href="css/bundle.min.css">
  <!-- css -->
</head>
<body class="sc__main gold gold--noBgImage">
  <?php
    $menu_filePath = 'data/menu.json';
    $menu = json_decode(file_get_contents($menu_filePath));
    $menu_count=count($menu);
  ?>
  <nav class="top-nav top-nav--menu p-display--none">
    <a href="#top"><img class="top-nav__logo top-nav__logo-square" src="img/logo_transp.png" alt="«Ветерок»"></a>
    <ul class="u-display--inline-block">
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="/#about">О нас</a>
      </li>
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="/#services">Услуги</a>
      </li>
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="/#menu">Меню</a>
      </li>
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="/#photos">Фотографии</a>
      </li>
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="/#reviews">Отзывы</a>
      </li>
      <li class="top-nav__list-item">
        <a class="top-nav__list-link top-nav__list-link--menu" href="#contacts">Контакты</a>
      </li>
    </ul>
  </nav>
  <div class="menu-nav__wrapper gold--noBgImage p-display--none">
    <ul class="menu-nav__list">
      <?php
        foreach($menu as $dish_type) {
          print '<li class="menu-nav__list-item">
              <a class="menu-nav__list-link" href="#header-'.$dish_type->{'type'}.'">'.$dish_type->{'title'}.'</a>
            </li>';
        }
      ?>
    </ul>
    <button id="cart-widjet" class="btn btn--gold btn--cart u-text-align--left"></button>
    <div class="menu-nav__footer">
      <h1 class="menu-nav__footer-title">Гостинично-ресторанный комплекс «Ветерок»</h1>
      <p class="menu-nav__footer-text">Волжский район, с. Подъем-Михайловка, (трасса Урал - Самара) ул. Советская, 37</p>
      <p class="menu-nav__footer-text">8 (846) 997-87-37</p>
      <p class="menu-nav__footer-text">veterok_spn@mail.ru</p>
    </div>
  </div>

  <div id="top" class="menu-container gold--noBgImage">
      <?php
        foreach($menu as $dish_type) {
          print '
            <h1 id="header-'.$dish_type->{'type'}.'" class="sc-heading menu-items__header p-display--none">'.$dish_type->{'title'}.'</h1>';
            foreach($dish_type->{'items'} as $dish) {
              if (strlen($dish->{'photo'}) > 0) {
                $photo = '<img class="u-float--left" src="'.$dish->{'photo'}.'" alt="'.$dish->{'title'}.'">';
              } else
                  $photo = '';
              if (strlen($dish->{'calories'}) > 0) {
                $calories = ' <span class="menu-item__cal">('.$dish->{'calories'}.')</span>';
              } else
                  $calories = '';
              print '
                <div class="menu-item p-display--none">
                '.$photo.'
                <p class="menu-item__title clearfix">'.$dish->{'title'}.$calories.'</p>
                <p class="menu-item__ingredients">'.$dish->{'ingredients'}.'</p>
                <p class="menu-item__price">
                <button id="cartItemAdd'.$dish->{'id'}.'" class="btn btn--add">
                  <span class="fa fa-plus-circle"></span>
                </button>
                '.$dish->{'price'}.' <span class="fa fa-rub"></span></p>
                </div>';
            }
        }
      ?>
  </div>
    <!-- javascript -->
  <script src="js/bundle.min.js"></script>
  <!-- javascript -->
</body>
</html>
