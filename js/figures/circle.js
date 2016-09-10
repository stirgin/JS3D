define([
    'point',
    'settings',
    'jquery',
    'underscore'
], function(Point, Settings) {

    var Circle = function(options) {
        this.type = options.type || 'circle';
        this.radiusId = options.radiusId;

        this.centerX = options.centerX || 0;
        this.centerY = options.centerY || 0;
        this.centerZ = options.centerZ || 0;

        this.pointId = 0;
        this.settings = new Settings(true);
        this.collection = [];

        this.update();
        return this;
    };

    Circle.prototype.addPoint = function(x, y, z) {
        this.collection.push(new Point(this.pointId, x, y, z));
        this.pointId++;
    };

    /*
     TODO
         type:
         0 -> bottom circle;
         1 -> top circle;
     */
    Circle.prototype.createCircle = function() {
        var pointOfCircle = this.settings.apprCoeff + 1,
            x1 = this.centerX + this.radius,
            y1 = this.centerY,
            z1 = 0,
            x2 = this.getX(this.radius, this.settings.alpha),
            y2 = this.getY(this.radius, this.settings.alpha),
            z2 = 0;

        this.addPoint(x1, y1, z1);

        for(var i = 1; i <= pointOfCircle; ++i) {
            this.settings.drawPoint(x1, y1);
            this.addPoint(x2, y2, z2);
            x1 = x2;
            y1 = y2;
            x2 = this.getX(this.radius, this.settings.alpha * i);
            y2 = this.getY(this.radius, this.settings.alpha * i);
        }
        this.settings.drawPoint(x1, y1);
        if (this.settings.mode === 'development') {
            console.log(this.type, 'collection = ', this.collection);
        }
    };

    Circle.prototype.getX = function(radius, alpha) {
        return (this.centerX + radius * Math.cos(this.settings.degre(alpha))).toFixed(3) * 1;
    };

    Circle.prototype.getY = function(radius, alpha) {
        return (this.centerY + radius * Math.sin(this.settings.degre(alpha))).toFixed(3) * 1;
    };

    Circle.prototype.update = function() {
        this.settings.updateData();

        this.radius = $(this.radiusId).val() * 1;

        if (this.settings.mode === 'development') {
            console.log(this.type, 'radius = ', this.radius);
        }
    };

    Circle.prototype.clear = function() {
        this.pointId = 0;
        this.collection = [];
    };

        return Circle;
    }
);