import * as modal from './lib/modal';
import hbsCart from '../../templates/cart.hbs';

/**
 * Cart module
 */
export default function VTCart() {
  let _Data = null;
  let _widjetObj = null;
  let _widjetID = null;
  const EMPTY_CART = 'Корзина пуста';
  const _events = {
    stateChanged: new CustomEvent('stateChanged', {detail: ''}),
  };

  /**
   * Calculate total cost of cart's items
   * and pass it to the widget
   */
  const _calculateTotal = () => {
    let total = 0;
    let itemsAmout = 0;

    _Data.forEach((item) => {
      itemsAmout++;
      total += item.num * item.price;
    });

    if (total > 0) {
      _widjetObj.html('Блюд: ' + itemsAmout + ', <br>Сумма: ' + total + ' <span class="fa fa-rub">');
    } else {
      _widjetObj.html(EMPTY_CART);
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

    _Data.forEach((item) => {
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
    _Data.forEach((item) => {
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
  };

  /**
   * Save _Data to localStorage
   */
  const _saveState = () => {
    localStorage.setItem(_widjetID, JSON.stringify(_Data));
  };

  /**
   * Find item in array and return index or null
   * if item is not found
   * @param  {String} id Item id
   * @return {Number : null}    Item index or null, if not found
   */
  const _findItem = (id) => {
    let itemIndex = null;
    const hasOrderItem = _Data.some((item, index) => {
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
      _Data[itemIndex].num++;
    } else {
      _Data.push(orderItem);
    }

    document.dispatchEvent(_events.stateChanged);
  };

  /**
   * Remove item from cart
   * @param  {Number} id Item id
   */
  const removeFromCart = (id) => {
    const itemIndex = _findItem(id);

    _Data.splice(itemIndex, 1);

    document.dispatchEvent(_events.stateChanged);
  };

  /**
   * Decrease amout of item in cart
   * or completely delete it
   * @param  {Number} id Item id
   */
  const decreaseItemAmount = (id) => {
    const itemIndex = _findItem(id);

    if (itemIndex !== null) {
      if (_Data[itemIndex].num === 1) {
        _Data.splice(itemIndex, 1);
      } else {
        _Data[itemIndex].num -= 1;
      }

      document.dispatchEvent(_events.stateChanged);
    }
  };

  /**
   * Get Cart items
   * @return {Array} Cart items
   */
  const getItems = () => {
    return _Data;
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
    _widjetID = id;
    _widjetObj = $('#' + _widjetID);

    _Data = JSON.parse(localStorage.getItem(id)) || [];

    _widjetObj.on('click', () => {
      showWinow();
    });

    document.addEventListener('stateChanged', () => {
      _updateView();
      _calculateTotal();
      _saveState();
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

    document.dispatchEvent(_events.stateChanged);
  };
}
