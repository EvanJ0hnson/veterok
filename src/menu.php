<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name=viewport content="width=960">
  <title>Гостиница «Ветерок»</title>
  <!-- css -->
  <link rel="stylesheet" href="css/vendor.min.css">
  <link rel="stylesheet" href="css/bundle.min.css">
  <!-- css -->
</head>
<body class="sc__main gold--noBgImage gold">
  <?php
    $menu_filePath = 'data/menu.json';
    $menu = json_decode(file_get_contents($menu_filePath));
    $menu_count=count($menu);
  ?>
  <nav class="top_nav top_nav-menu p-display--none">
    <a href="/"><img class="top_nav--logo-square" src="img/logo_transp.png" alt="«Ветерок»"></a>
    <ul class="u-float--right">
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

  <ul class="menu_nav gold--noBgImage p-display--none">
    <?php
      foreach($menu as $dish_type) {
        print '<li class="menu_nav-item">
            <a class="menu_nav-link" href="#header-'.$dish_type->{'type'}.'">'.$dish_type->{'title'}.'</a>
          </li>';
      }
    ?>
    <li class="menu_nav-item">
      <a id="cart-widjet" class="btn btn--gold btn--cart"></a>
    </li>
    <div class="menu-nav-footer">
      <h1 class="menu-nav-footer__title">Гостинично-ресторанный комплекс «Ветерок»</h1>
      <p class="menu-nav-footer__text">Волжский район, с. Подъем-Михайловка, (трасса Урал - Самара) ул. Советская, 37</p>
      <p class="menu-nav-footer__text">8 (846) 997-87-37</p>
      <p class="menu-nav-footer__text">veterok_spn@mail.ru</p>
    </div>
  </ul>

  <div class="menu-container">
    <div class="gold--noBgImage p-display--none">
      <?php
        foreach($menu as $dish_type) {
          print '
            <h1 id="header-'.$dish_type->{'type'}.'" class="sc-heading">'.$dish_type->{'title'}.'</h1>
            <div id="'.$dish_type->{'type'}.'" class="menu-items-container">';
            foreach($dish_type->{'items'} as $dish) {
              if (strlen($dish->{'photo'}) > 0) {
                $photo = '<img class="u-float--left" src="'.$dish->{'photo'}.'" alt="">';
              } else
                  $photo = '';
              print '
                <div class="menu-item">
                '.$photo.'
                <p class="menu-item--title clearfix">'.$dish->{'title'}.' <span class="menu-item--cal">('.$dish->{'calories'}.')</span></p>
                <p class="menu-item--ingredients">'.$dish->{'ingredients'}.'</p>
                <p class="menu-item--price">
                <button id="vtCartItemAdd'.$dish->{'id'}.'" class="btn btn--add">
                  <span class="fa fa-plus-circle"></span>
                </button>
                '.$dish->{'price'}.' <span class="fa fa-rub"></span></p>
                </div>';
            }
          print '</div>';
        }
      ?>
    </div>
  </div>
    <!-- javascript -->
  <script src="js/bundle.min.js"></script>
  <!-- javascript -->
</body>
</html>
