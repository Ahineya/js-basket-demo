(function() {
    window.addEventListener('load', function() {
        function App() {
            this.modules = window.modules;

            this.modules.pubsub.applyTo(this);
            var self = this;

            this.publish('app/start');

            this.subscribe('app/products:received', function(products) {
                self.publish('app/products/display', products);
            });

            this.subscribe('app/basket:add', function(product) {
                self.publish('app/basket/add', product);
            });

            this.subscribe('app/API:checkout', function(products) {
                self.publish('API/checkout', products);
            });

            document.querySelector('.basket-toggle').addEventListener('click', function() {
                self.publish('app/basket/toggle');
            });

        }

        var app = new App();
    });
})();