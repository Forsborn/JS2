'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  class GoodsItem {
    constructor(title, price, img = '') {
      this.title = title;
      this.price = price;
      this.img = img; // TODO пока не реализовано, картинки статичны
    }
    render() {
      return `
      <div class="basket__product">
        <div class="img__box"><a href="#" class="img__box__link" ></a></div>
        <div class="text__box">
            <p class="basket__text">${this.title}</p>
            <img src="img/low-star.png" alt="">
            <div class="basket__text">
                <span class="basket__cost">1</span>
                <span class="basket__x">x</span>
                <span class="basket__cost">${this.price}</span>
            </div>
        </div>
        <div class="basket__close">
            <a href="#"><i class="fas fa-times-circle basket__close"></i></a>
        </div>
      </div>
      `;
    }
  }
  
  class GoodsList {
    constructor() {
      this.goods = [];
    }
    fetchGoods() {
      // асинхронная логика, получение с бека
      this.goods = goods;
    }
    render() {
      let html = '';
      this.goods.forEach(({ title, price }) => {
        const goodItem = new GoodsItem(title, price);
        html += goodItem.render();
      });
      document.querySelector('.header__right__div').innerHTML = html;
    }
  }
  
  const list = new GoodsList();
  list.fetchGoods();
  list.render();


let basket = document.querySelector('.header__right__div');
basket.insertAdjacentHTML("beforeend", `
            <div class="basket__total">
                <p>TOTAL</p>
                <p>$${this.sum}</p>
            </div>
            <div class="basket__check-cart">
                <a href="#" class="basket__checkout">Checkout</a>
            </div>
            <div class="basket__check-cart">
                <a href="#" class="basket__cart">Go to cart</a>
            </div>
        `);


        
