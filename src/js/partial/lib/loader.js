/**
 * showAjaxSpinner
 */
const $document = $(document);

export default function loader() {
  const $spinner = $('#spinner');
  
  $document.ajaxStart(() => {
    $spinner.show();
  });
  
  $document.ajaxComplete(() => {
    $spinner.hide();
  });
}
/**
 * showAjaxSpinner
 */