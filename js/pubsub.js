(function () {
    window.addEventListener('load', function() {
        var PubSub = function () {

            var subToken = 0;
            var topics = {};

            this.publish = function (topic, obj) {

                if (!topics[topic]) {
                    return false;
                }

                topics[topic].forEach(function (item) {
                    item.func(obj);
                });


            };

            this.subscribe = function (topic, callback) {
                /* istanbul ignore else */
                if (!topics[topic]) {
                    topics[topic] = [];
                }

                var token = ++subToken;

                topics[topic].push({
                    token: token,
                    func: callback
                });

                return token;
            };

            this.unsubscribe = function (token) {

                for (var m in topics) {
                    /* istanbul ignore else */
                    if (topics[m]) {
                        for (var i = 0, l = topics[m].length; i < l; i++) {
                            if (topics[m][i].token === token) {
                                topics[m].splice(i, 1);
                            }
                        }
                    }
                }

            };

            this.applyTo = function (obj) {
                if (typeof obj !== 'undefined') {
                    obj.publish = this.publish;
                    obj.subscribe = this.subscribe;
                }
            };

        };

        window.modules = window.modules || {};
        window.modules.pubsub = new PubSub();
    });
})();