(function() {
    window.addEventListener('load', function() {
        function Products() {
            window.modules.pubsub.applyTo(this);
            var self = this;

            this.constants = {
                PRODUCT_PLACEHOLDER: "img/placeholder.gif"
            };
            this.productTemplate = document.querySelector('#product').content;

            this.subscribe('app/products/display', _showProducts(products));

            function _cloneTemplate(template) {
                return document.importNode(template, true);
            }

            function _showProducts(products) {
                return function(products) {
                    products.forEach(function(product) {
                        var tpl = _cloneTemplate(self.productTemplate);
                        tpl.querySelector('img').setAttribute('src', product.image || self.constants.PRODUCT_PLACEHOLDER);
                        tpl.querySelector('.product-name').innerHTML = product.name;
                        tpl.querySelector('.product-description').innerHTML = product.description;
                        tpl.querySelector('button').addEventListener('click', function() {
                            self.publish('app/basket:add', product);
                        });

                        document.querySelector('#products').appendChild(tpl);

                    });
                }
            }

        }

        window.modules = window.modules || {};
        window.modules.products = new Products();
    });

})();