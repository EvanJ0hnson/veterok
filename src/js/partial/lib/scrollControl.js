/**
 * hack scroll for modal
 */
const keys = [37, 38, 39, 40];
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function keydown(e) {
  let i = keys.length;
  for (i; i--; null) {
  // for (;;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

function wheel(e) {
  preventDefault(e);
}

export function disable_scroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  document.ontouchmove = (e) => {
    e.preventDefault();
  };
}

export function enable_scroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  document.ontouchmove = () => {
    return true;
  };
}
