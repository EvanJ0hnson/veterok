<div class="container sc-sub">
	<h1 id="news" class="sc-subheading">Новости</h1>
	<div class="sc-news_column">
	<?php
		// $news_file = '../news/data/news.txt';
		$news = json_decode(file_get_contents('../data/news.json'));
	  if ($news) {
	    foreach(array_reverse($news) as $item) {
	    	print '<div class="sc-news-item_column">
	    	      <p class="sc-news-title">'.$item->{'title'}.'</p>
	    	      <p class="sc-news-date">'.$item->{'date'}.'</p>
	    	      <p class="sc-news-text">'.$item->{'body'}.'</p>
	    	      </div>';
	    }
	    unset ($item);
	  } else echo '<p class="sc-paragraph">Новостей нет</p>';
	?>
	</div>
</div>