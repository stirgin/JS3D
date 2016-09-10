define([
        'jquery',
        'underscore'
], function() {
        var Point = function(id, x, y, z) {
            this.type = 'point';
            this.id = id;
            this.x = x;
            this.y = y;
            this.z = z;

            return this;
        };

        Point.prototype.update = function(id, x, y, z) {
            this.id = id || this.id;
            this.x = x || this.x;
            this.y = y || this.y;
            this.z = z || this.z;
        };

        return Point;
    }
);