<div class="cd-photoslider-wrapper">
  <div class="cd-photoslider popup--slider">
      <?php
      $type = $_REQUEST['type'];
      foreach (glob('../photo/services/'.$type) as $Picture) {
        echo '<div style="background-image: url('.$Picture.');"></div>';
      }
      ?>
  </div>
</div> 

