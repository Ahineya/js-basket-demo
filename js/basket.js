(function() {
    window.addEventListener('load', function() {
        function Basket() {
            window.modules.pubsub.applyTo(this);
            var self = this;
            this.products = [];
            this.basket = document.querySelector('.basket-container');
            this.basketItemTemplate = document.querySelector('#basketItem').content;

            this.constants = {
                PRODUCT_PLACEHOLDER: "img/placeholder.gif"
            };

            document.querySelector('.checkout').addEventListener('click', function() {
                self.publish('app/API:checkout', self.products);

                self.products = self.products.forEach(function(basketProduct) {
                    basketProduct.view.remove();
                });

                self.products = [];
            });

            this.subscribe('app/basket/add', function(product) {

                if (self.products.filter(function(basketProduct) {
                    return product.id === basketProduct.id;
                }).length === 0 ) {

                    var tpl = document.importNode(self.basketItemTemplate, true);

                    tpl.querySelector('img').setAttribute('src', product.image || self.constants.PRODUCT_PLACEHOLDER);
                    tpl.querySelector('.product-name').innerHTML = product.name;
                    tpl.querySelector('.product-quantity').value = 1;

                    addBasketListeners(tpl, product);

                    self.basket.appendChild(tpl);

                    var view = self.basket.querySelector('.product:last-child');

                    self.products.push({
                        id: product.id,
                        count: 1,
                        product: product,
                        view: view
                    });

                } else {
                    for (var i = 0; i<self.products.length; i++) {
                        if (self.products[i].id === product.id) {
                            self.products[i].count++;
                            self.products[i].view.querySelector('.product-quantity').value = self.products[i].count;
                            break;
                        }
                    }
                }

            });

            this.subscribe('app/basket/toggle', function() {
                self.basket.classList.toggle('hidden')
            });

            function addBasketListeners(tpl, product) {
                tpl.querySelector('.product-delete').addEventListener('click', function() {
                    self.products = self.products.filter(function(basketProduct) {
                        if (product.id === basketProduct.id) {
                            basketProduct.view.remove();
                        }
                        return product.id !== basketProduct.id;
                    });

                    console.log(self.products);
                });

                tpl.querySelector('.product-quantity').addEventListener('input', function() {
                    var input = this;
                    self.products.forEach(function(basketProduct) {
                        if (product.id === basketProduct.id) {
                            basketProduct.count = +input.value;
                        }
                    });

                    console.log(self.products);
                });
            }

        }

        window.modules = window.modules || {};
        window.modules.basket = new Basket();
    });
})();