define([
        'jquery',
        'underscore'
], function() {
        var Point = function(x, y, z, id) {
            this.type = 'point';
            this.id = id;
            this.x = x;
            this.y = y;
            this.z = z;

            return this;
        };

        Point.prototype.update = function(x, y, z, id) {
            this.id = id || this.id;
            this.x = x || this.x;
            this.y = y || this.y;
            this.z = z || this.z;

            return this;
        };

        Point.prototype.drawPoint = function(color) {
            Settings.changeColor(color);
            Settings.drawPoint(this);

            return this;
        };

        return Point;
    }
);