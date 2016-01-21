import * as modal from './lib/modal';
import hbsCart from '../../templates/cart.hbs';

/**
 * Cart module
 */
export default function VTCart() {
  let _DATA = null;
  let widjetObj = null;
  let widjetID = null;
  const EMPTY_CART = 'Корзина пуста';

  /**
   * Calculate total cost of cart's items
   * and pass it to the widget
   */
  const _calculateTotal = () => {
    let total = 0;
    let itemsAmout = 0;

    _DATA.forEach((item) => {
      itemsAmout++;
      total += item.num * item.price;
    });

    if (total > 0) {
      widjetObj.html('Блюд: ' + itemsAmout + ', <br>Сумма: ' + total + ' <span class="fa fa-rub">');
    } else {
      widjetObj.html(EMPTY_CART);
    }
  };

  /**
   * Render Handlebars template
   * @return {String} String with HTML template
   */
  const _renderTemplate = () => {
    let total = 0;
    let counter = 0;
    const order = [];

    _DATA.forEach((item) => {
      const orderItem = {};
      counter++;

      orderItem.id = item.id;
      orderItem.number = counter;
      orderItem.name = item.name;
      orderItem.price = item.price;
      orderItem.count = item.num;
      orderItem.sum = item.price * item.num;

      total += orderItem.sum;

      order.push(orderItem);
    });

    return hbsCart({order, total});
  };

  /**
   * Add eventListeners to buttons on modal window
   */
  const _assignEvents = () => {
    _DATA.forEach((item) => {
      const itemId = item.id;
      const $itemDecrease = $('#vtCartItemDecrease' + itemId);
      const $itemIncrease = $('#vtCartItemIncrease' + itemId);
      const $itemRemove = $('#vtCartItemRemove' + itemId);

      $itemDecrease.on('click', () => {
        decreaseItemAmount(itemId);
      });
      $itemIncrease.on('click', () => {
        addToCart(itemId);
      });
      $itemRemove.on('click', () => {
        removeFromCart(itemId);
      });
    });
  };

  /**
   * Update cart view
   */
  const _updateView = () => {
    const $modal = $('.popup');
    const cart = _renderTemplate();

    $modal.html(cart);
    _assignEvents();
    _calculateTotal();
  };

  /**
   * Find item in array and return index or null
   * if item is not found
   * @param  {String} id Item id
   * @return {Number : null}    Item index or null, if not found
   */
  const _findItem = (id) => {
    let itemIndex = null;
    const hasOrderItem = _DATA.some((item, index) => {
      itemIndex = index;
      return item.id === id;
    });

    return (hasOrderItem ? itemIndex : null);
  };

  /**
   * Add new item to cart or increase amout of existing one
   * @param  {String} id    ID
   * @param  {String} name  Item name
   * @param  {Number} price Item price
   */
  const addToCart = (id, name, price) => {
    let itemIndex = null;
    const orderItem = {
      id,
      name,
      price,
      num: 1,
    };

    itemIndex = _findItem(id);

    if (itemIndex !== null) {
      _DATA[itemIndex].num++;
    } else {
      _DATA.push(orderItem);
    }

    localStorage.setItem(widjetID, JSON.stringify(_DATA));
    _updateView();
  };

  /**
   * Remove item from cart
   * @param  {Number} id Item id
   */
  const removeFromCart = (id) => {
    const itemIndex = _findItem(id);

    _DATA.splice(itemIndex, 1);

    localStorage.setItem(widjetID, JSON.stringify(_DATA));
    _updateView();
  };

  /**
   * Decrease amout of item in cart
   * or completely delete it
   * @param  {Number} id Item id
   */
  const decreaseItemAmount = (id) => {
    const itemIndex = _findItem(id);

    if (itemIndex !== null) {
      if (_DATA[itemIndex].num === 1) {
        _DATA.splice(itemIndex, 1);
      } else {
        _DATA[itemIndex].num -= 1;
      }

      localStorage.setItem(widjetID, JSON.stringify(_DATA));
      _updateView();
    }
  };

  /**
   * Get Cart items
   * @return {Array} Cart items
   */
  const getItems = () => {
    return _DATA;
  };

  /**
   * Show Cart modal
   */
  const showWinow = () => {
    const cart = _renderTemplate();

    modal.open(cart);

    _assignEvents();
  };

  /**
   * Object initialization
   * @param  {String} id Object Id
   */
  this.init = (id) => {
    widjetID = id;
    widjetObj = $('#' + widjetID);

    _DATA = JSON.parse(localStorage.getItem(id)) || [];

    widjetObj.on('click', () => {
      showWinow();
    });

    $('#vtCartItemAdd001').on('click', () => {
      addToCart('001', 'Салат «Грибы с сыром»', 130);
    });

    $('#vtCartItemAdd002').on('click', () => {
      addToCart('002', 'Просто салат обычный', 150);
    });

    $('#vtCartItemAdd003').on('click', () => {
      addToCart('003', 'Просто салат обычный', 150);
    });

    if (_DATA.length) {
      _calculateTotal();
    } else {
      widjetObj.html(EMPTY_CART);
    }
  };
}
