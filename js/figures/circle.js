define([
    'point',
    'jquery',
    'underscore'
], function(Point) {

    var Circle = function(options) {
        this.type = options.type || 'circle';
        this.radius = options.radius;

        this.centerX = options.centerX || 0;
        this.centerY = options.centerY || 0;
        this.centerZ = options.centerZ || 0;

        this.color = options.color;
        this.height = options.height;

        this.pointId = 0;
        this.pointCollection = [];

        return this;
    };

    Circle.prototype.addPoint = function(point) {
        this.pointCollection.push(new Point(point.x, point.y, point.z, this.pointId));
        this.pointId++;
    };

    Circle.prototype.drawPoints = function() {
        Settings.changeColor(this.color);
        _.each(this.pointCollection, function(point) {
            Settings.drawPoint(point);
        });
    };

    Circle.prototype.createCircle = function() {
        var x1 = this.centerX,
            y1 = this.centerY,
            z1 = this.centerZ;

        for(var i = 0; i < 360; i += Settings.alpha) {
            this.addPoint({
                x: this.getX(i),
                y: y1,
                z: this.getZ(i)
            });
        }

        if (Settings.mode === 'development') {
            console.log(this.type, 'collection = ', this.pointCollection);
        }
    };

    Circle.prototype.getX = function(alpha) {
        return (this.radius * Math.cos(Settings.degre(alpha))).toFixed(3) * 1;
    };

    Circle.prototype.getZ = function(alpha) {
        return (this.radius * Math.sin(Settings.degre(alpha))).toFixed(3) * 1;
    };

/*
 Circle.prototype.createCircle = function() {
 var x1 = this.centerX,
 y1 = this.centerY,
 z1 = this.centerZ;

 for(var i = 0; i < 360; i += Settings.alpha) {
 this.addPoint(
 this.getX(i),
 y1,
 this.getZ(i)
 );
 }

 if (Settings.mode === 'development') {
 console.log(this.type, 'collection = ', this.pointCollection);
 }
 };

 Circle.prototype.getX = function(alpha) {
 return (this.radius * Math.cos(Settings.degre(alpha))).toFixed(3) * 1;
 };

 Circle.prototype.getZ = function(alpha) {
 return (this.radius * Math.sin(Settings.degre(alpha))).toFixed(3) * 1;
 };
 */

        return Circle;
    }
);