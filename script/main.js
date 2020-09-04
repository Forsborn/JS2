'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// const fetch = (method, url, cb) => {
//   let xhr;
//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) {
//     xhr = new ActiveXObject ("Microsoft.XMLHTTP");
//   }

//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//       cb(JSON.parse(xhr.response));
//     }
//   }
//   xhr.open(method, url);

//   xhr.send();
// }

// fetch('GET', API, (data) => {
//   console.log(data);
// });

function makeGETRequest(url) {
		return new Promise ((resolve, reject) => { // проверка на браузер через промис
		let xhr;
		if ( xhr = window.XMLHttpRequest) { 
			return resolve(xhr);
		} else if (xhr = window.ActiveXObject) {
			return resolve(xhr);
		} else if (xhr != window.XMLHttpRequest && xhr != window.ActiveXObject) { //  <= надо ли вообще делать эту проверку?
			return reject();
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.response);
			} else {
				reject();
			}
		}

		xhr.open( 'GET' , url , true);
		xhr.send();

	});
}

const goods = [
    { title: 'shirt', price: 150 },
    { title: 'socks', price: 50 },
    { title: 'jacket', price: 350 },
    { title: 'shoes', price: 250 },
  ];
  
  class GoodsItem {
    constructor(title, price, img = '') {
      this.title = title;
      this.price = price;
      this.img = img; // TODO пока не реализовано, картинки статичны
    }
    render() {
      return `
      <div class="basket__product" v-for='goods in filteredList'>
        <div class="img__box"><a href="#" class="img__box__link" ></a></div>
        <div class="text__box">
            <p class="basket__text">{{ goods.title }}</p>
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
	  makeGETRequest(`${API}/catalogData.json`)
	  .then(data => {
		  JSON.parse(data);
	  })
	  .catch(err =>{
		  console.log(err);
	  });
	  
    }
    render() {
      let html = '';
      this.goods.forEach(({ title, price }) => {
        const goodItem = new GoodsItem(title, price);
        html += goodItem.render();
      });
      document.querySelector('.header__right__div').innerHTML = html;
    }
    sumTotal() {
      this.fetchGoods();
      return this.goods.reduce ((acc, {price}) => acc += price, 0);
    }
  }
  
  const list = new GoodsList();
  list.fetchGoods();
  list.render();


let basket = document.querySelector('.header__right__div');
basket.insertAdjacentHTML("beforeend", `
            <div class="basket__total">
                <p>TOTAL</p>
                <p>$${list.sumTotal()}</p>
            </div>
            <div class="basket__check-cart">
                <a href="#" class="basket__checkout">Checkout</a>
            </div>
            <div class="basket__check-cart">
                <a href="#" class="basket__cart">Go to cart</a>
            </div>
        `
);
// слушатель на удаление товара из корзины
let closeBtn = document.querySelectorAll('.fa-times-circle');
closeBtn.forEach(function(btn) {
  btn.addEventListener('click', function (event) {} )
});

	new Vue({
		el:'header',
		data: {
			title: '',
			goods,

		},
		computed:{
            filteredList: function(){
                let prod = this.title;
                return this.goods.filter(function (elem) {
                    if(prod==='') return true;
                    else return elem.title.indexOf(prod) > -1;
                })
            }
        }
	});