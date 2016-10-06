define([
    'circle',
    'jquery',
    'underscore'
], function(Circle) {

    var Cylinder = function() {
        this.type = 'Cylinder';

        this.setCylinderOptions();
        this.createBase();

        this.baseLineCollection = {
            upperBase: {},
            lowerBase: {},
            sideSurface: {}
        };

        return this;
    };

    Cylinder.prototype.setCylinderOptions = function() {
        this.r1 = Settings.cylinder.r1;
        this.r2 = Settings.cylinder.r2;
        this.height = Settings.cylinder.h;

        this.color = Settings.cylinder.color;

        this.centerX = Settings.centerX;
        this.centerY = Settings.centerY;
        this.centerZ = Settings.centerZ;
    };

    Cylinder.prototype.createBase = function() {
        this.base = {
            upperBase: new Circle({
                type: 'upperCircle',
                radius: this.r1,
                centerX: this.centerX,
                centerY: this.centerY - this.height,
                centerZ: this.centerZ,
                color: this.color
            }),
            lowerBase:  new Circle({
                type: 'lowerCircle',
                radius: this.r2,
                centerX: this.centerX,
                centerY: this.centerY,
                centerZ: this.centerZ,
                color: this.color
            })
        };
    };

    Cylinder.prototype.create = function() {
        this.base.upperBase.createCircle(this.centerX, this.centerY, this.r1);
        this.base.lowerBase.createCircle(this.centerX, this.centerY, this.r2);

        this.createCircleLine('upperBase');
        this.createCircleLine('lowerBase');
        this.createSideSurfaceLine();
    };

    Cylinder.prototype.draw = function() {
        if (Settings.draw.point) {
            this.drawPoints();
        }
        if (Settings.draw.line) {
            this.drawLines();
        }
    };

    Cylinder.prototype.drawPoints = function() {
        this.base.upperBase.drawPoints();
        this.base.lowerBase.drawPoints();
    };

    Cylinder.prototype.getAllLines = function() {
        var upperBase = this.baseLineCollection.upperBase,
            lowerBase = this.baseLineCollection.lowerBase,
            sideSurface = this.baseLineCollection.sideSurface,
            lines = upperBase.line.concat(lowerBase.line);

        lines = lines.concat(sideSurface.line);

        return lines;
    };

    Cylinder.prototype.drawLines = function() {
        var lines = this.getAllLines();

        //console.log('All Cylinder lines data: ', lines);
        Settings.changeColor(this.color);

        for(var i = 0; i < lines.length; ++i){
            Settings.drawLine(lines[i]);
        }
    };

    Cylinder.prototype.createCircleLine = function(base) {
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
        //console.log('Cylinder ' + base + ' line is created');
        //console.log(lineCollection);
    };

    Cylinder.prototype.createSideSurfaceLine = function() {
        var upperBasePoint = this.base.upperBase.pointCollection,
            lowerBasePoint = this.base.lowerBase.pointCollection,
            verticalLine =  [];

        for(var i = 0; i < lowerBasePoint.length; i++) {
            verticalLine.push( {
                from: upperBasePoint[i],
                to: lowerBasePoint[i]
            });
        }

        this.baseLineCollection.sideSurface.line = verticalLine;
        //console.log('Cylinder surface line is created');
        //console.log('surface line data', verticalLine);
    };


    return Cylinder;
});