export default function smoothScroll() {
  $('a[href^="#"], a[href^="."]').on('click', (event) => {
    const scroll_el = $(event.currentTarget).attr('href');
    if ($(scroll_el).length !== 0) {
      $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 350);
    }
    return false;
  });
}
