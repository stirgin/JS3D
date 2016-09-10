define([], function() {
    function AbstractFigure(optinos) {
        this.options = options;
    };

    AbstractFigure.prototype.log = function() {
	    console.log.apply(console, arguments);
    };

        return AbstractFigure;
    }
);