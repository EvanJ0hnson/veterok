/**
 * Get JSON data
 * @param  {String}   url      URL to a file
 * @return {JSON} JSON with booked days
 */
export function getJSON(url, callback) {
  const ajax = new XMLHttpRequest();

  ajax.open('GET', url, true);

  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        return callback(ajax.responseText);
      }
    }
  };

  ajax.send();
}
