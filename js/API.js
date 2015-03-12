(function() {
    window.addEventListener('load', function() {

        function API() {

            var self = this;

            window.modules.pubsub.applyTo(this);
            var products = [
                {
                    id: 1,
                    name: "Lighter",
                    description: "Cool Cricket lighter"
                },
                {
                    id: 2,
                    name: "Matches",
                    description: "Old wooden matches"
                },
                {
                    id: 3,
                    name: "Candle",
                    description: "Light a candle and you will see a light o_O",
                    image: "http://placekitten.com/g/101/101"
                }
            ];

            this.subscribe('app/start', function() {
                _getProducts();
            });

            this.subscribe('API/checkout', function(products) {
                console.log(products);
            });

            function _getProducts() {
                setTimeout(function() {
                    self.publish('app/products:received', products);
                }, 1000);
            }
        }

        window.modules = window.modules || {};
        window.modules.API = new API();
    });

})();
