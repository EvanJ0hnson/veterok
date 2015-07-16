<div class="cd-photoslider-wrapper"> <!-- Слайдер отзывами -->
  <div class="cd-photoslider popup--slider">
      <?php
      $type = $_REQUEST['type'];
      foreach (glob('../photo/'.$type.'/*.jpg') as $Picture) {
        echo '<div style="background-image: url('.$Picture.');"></div>';
      }
      ?>
<!--     <div style="background-image: url(photo/restaraunt/veterok-restaraunt_01.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_02.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_03.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_04.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_05.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_06.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_07.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_08.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_09.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_10.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_11.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_12.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_13.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_14.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_15.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_16.jpg);"></div>
    <div style="background-image: url(photo/restaraunt/veterok-restaraunt_17.jpg);"></div> -->
  </div>
</div> <!-- cd-photoslider-wrapper -->

