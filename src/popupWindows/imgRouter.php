<div class="cd-photoslider-wrapper">
  <div class="cd-photoslider popup--slider">
      <?php
      $type = $_REQUEST['type'];
      foreach (glob('../photo/'.$type.'/*.jpg') as $Picture) {
        echo '<div data-src="'.$Picture.'"></div>';
      }
      ?>
  </div>
</div> 

