import * as modalWindow from './lib/modal';
import * as _u from './lib/utilites';

import hbsCart from '../../templates/cart.hbs';

/**
 * Cart module
 */
export default function VTCart() {
  let _data = null;
  let _widjetObj = null;
  let _widjetID = null;
  const EMPTY_CART = 'Корзина пуста';
  const _events = {
    stateChanged: new CustomEvent('stateChanged', {detail: ''}),
  };

  /**
   * Cart widjet template
   * @param  {Number} amout Amout of orders
   * @param  {Number} total Total cost
   * @return {String}       Generated template
   */
  function _tplCartWidjet(amout, total) {
    const tpl = `
      Блюд: ${amout}, <br>
      Сумма: ${total} <span class="fa fa-rub">
    `;
    return tpl;
  }

  /**
   * Calculate total cost of cart's items
   * and pass it to the widget
   */
  const _calculateTotal = () => {
    let total = 0;
    let itemsAmout = 0;

    _data.forEach((item) => {
      itemsAmout++;
      total += item.num * item.price;
    });

    if (total > 0) {
      _widjetObj.innerHTML = _tplCartWidjet(itemsAmout, total);
    } else {
      _widjetObj.innerHTML = EMPTY_CART;
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

    _data.forEach((item) => {
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
    _data.forEach((item) => {
      const itemId = item.id;
      const itemDecrease = _u.getElement('#vtCartItemDecrease' + itemId);
      const itemIncrease = _u.getElement('#vtCartItemIncrease' + itemId);
      const itemRemove = _u.getElement('#vtCartItemRemove' + itemId);

      itemDecrease.addEventListener('click', () => {
        decreaseItemAmount(itemId);
      });
      itemIncrease.addEventListener('click', () => {
        addToCart(itemId);
      });
      itemRemove.addEventListener('click', () => {
        removeFromCart(itemId);
      });
    });
  };

  /**
   * Update cart view
   */
  const _updateView = () => {
    const modal = _u.getElement('.popup');
    const cart = _renderTemplate();

    if (modal) {
      modal.innerHTML = cart;

      _assignEvents();
    }
  };

  /**
   * Save _data to localStorage
   */
  const _saveState = () => {
    localStorage.setItem(_widjetID, JSON.stringify(_data));
  };

  /**
   * Load data from localStorage
   * @return {Array} Order items
   */
  const _loadState = (id) => {
    return JSON.parse(localStorage.getItem(id)) || [];
  };

  /**
   * Find item in array and return index or null
   * if item is not found
   * @param  {String} id Item id
   * @return {Number : null}    Item index or null, if not found
   */
  const _findItem = (id) => {
    let itemIndex = null;
    const hasOrderItem = _data.some((item, index) => {
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
      _data[itemIndex].num++;
    } else {
      _data.push(orderItem);
    }

    document.dispatchEvent(_events.stateChanged);
  };

  /**
   * Remove item from cart
   * @param  {Number} id Item id
   */
  const removeFromCart = (id) => {
    const itemIndex = _findItem(id);

    _data.splice(itemIndex, 1);

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
      if (_data[itemIndex].num === 1) {
        _data.splice(itemIndex, 1);
      } else {
        _data[itemIndex].num -= 1;
      }

      document.dispatchEvent(_events.stateChanged);
    }
  };

  /**
   * Get Cart items
   * @return {Array} Cart items
   */
  const getItems = () => {
    return _data;
  };

  /**
   * Show Cart modal
   */
  const showWindow = () => {
    const cart = _renderTemplate();

    modalWindow.open(cart);

    _assignEvents();
  };

  /**
   * Object initialization
   * @param  {String} id Object Id
   */
  this.init = (id) => {
    _widjetID = id;
    _widjetObj = _u.getElement('#' + _widjetID);

    _data = _loadState(id);

    _widjetObj.addEventListener('click', () => {
      showWindow();
    });

    document.addEventListener('stateChanged', () => {
      _updateView();
      _calculateTotal();
      _saveState();
    });

    document.dispatchEvent(_events.stateChanged);

    /** Test related events */
    _u.getElement('#vtCartItemAdd001').addEventListener('click', () => {
      addToCart('001', 'Салат «Грибы с сыром»', 130);
    });

    _u.getElement('#vtCartItemAdd002').addEventListener('click', () => {
      addToCart('002', 'Просто салат обычный', 150);
    });

    _u.getElement('#vtCartItemAdd003').addEventListener('click', () => {
      addToCart('003', 'Просто салат обычный', 150);
    });
  };
}
