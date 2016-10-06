define([
    'circle',
    'point',
    'jquery',
    'underscore'
], function(Circle, Point) {

    var Cone = function() {
        this.type = 'Cone';
        this.setConeOptions();
        this.createBase();

        this.baseLineCollection = {
            lowerBase: {},
            sideSurface: {}
        };

        return this;
    };

    Cone.prototype.setConeOptions = function() {
        this.r = Settings.cone.r;
        this.height = Settings.cone.h;

        this.color = Settings.cone.color;

        this.centerX = Settings.centerX;
        this.centerY = Settings.centerY;
        this.centerZ = Settings.centerZ;
    };

    Cone.prototype.createBase = function() {
        this.base = {
            upperBase:{
                pointCollection: [new Point(
                    0,
                    -this.height,
                    0,
                    0
                )]
            },
            lowerBase:  new Circle({
                type: 'lowerCircle',
                radius: this.r,
                centerX: this.centerX,
                centerY: this.centerY,
                centerZ: this.centerZ,
                color: this.color
            })
        };
    };

    Cone.prototype.create = function() {
        this.base.lowerBase.createCircle(this.centerX, this.centerY, this.r);

        this.createCircleLine('lowerBase');
        this.createSideSurfaceLine();
    };

    Cone.prototype.draw = function() {
        if (Settings.draw.point) {
            this.drawPoints();
        }
        if (Settings.draw.line) {
            this.drawLines();
        }
    };

    Cone.prototype.drawPoints = function() {
        this.base.upperBase.pointCollection[0].drawPoint(this.color);
        this.base.lowerBase.drawPoints();
    };


    Cone.prototype.createCircleLine = function(base) {
        var point = this.base[base].pointCollection,
            startPoint = point[0],
            currPoint = point[0],
            nextPoint,
            lineCollection = [];

        for(var i = 1; i < point.length; i++) {
            nextPoint = point[i];

            lineCollection.push( {
                from: currPoint,
                to: nextPoint
            });

            currPoint = nextPoint;
        }

        lineCollection.push( {
            from: nextPoint,
            to: startPoint
        });

        this.baseLineCollection[base].line = lineCollection;
    };

    Cone.prototype.createSideSurfaceLine = function() {
        var upperBasePoint = this.base.upperBase.pointCollection,
            lowerBasePoint = this.base.lowerBase.pointCollection,
            verticalLine =  [];

        for(var i = 0; i < lowerBasePoint.length; i++) {
            verticalLine.push( {
                from: upperBasePoint[0],
                to: lowerBasePoint[i]
            });
        }

        this.baseLineCollection.sideSurface.line = verticalLine;
    };

    Cone.prototype.getAllLines = function() {
        var lowerBase = this.baseLineCollection.lowerBase,
            sideSurface = this.baseLineCollection.sideSurface,
            lines = lowerBase.line.concat(sideSurface.line);

        return lines;
    };

    Cone.prototype.drawLines = function() {
        var lines = this.getAllLines();

        //console.log('All Cylinder lines data: ', lines);
        Settings.changeColor(this.color);

        for(var i = 0; i < lines.length; ++i){
            Settings.drawLine(lines[i]);
        }
    };

        return Cone;
    }
);