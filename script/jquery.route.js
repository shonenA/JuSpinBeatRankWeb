(function($) {
    $.extend({
        route: new
        function() {
            var routeList = {};

            this.addRoute = function(name, callback) {
                if( typeof(name) === 'undefined' ) return this;
                if( typeof(callback) === 'undefined' ) callback = function(){}; // null route

                routeList[name] = callback;
                
                return this;
            }

            this.call = function(name) {
                if( typeof(name) === 'undefined' ) return this;
                if( typeof(routeList[name]) === 'undefined' ) return this;

                var args = Array.prototype.slice.call(arguments, 1);

                return routeList[name].apply(routeList[name], args);
            }
        }
    });
})(jQuery);

