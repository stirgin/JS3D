define([
    'jquery',
    'underscore'
], function() {

    var Rotator = function(){
        this.matrixes = {
            'x': this.getXmatrix,
            'z': this.getZmatrix,
            'y': this.getYmatrix
        };

        return this;
    };

    Rotator.prototype.rotate = function(alpha, axis) {
        var rotateMatrix = this.matrixes[axis](alpha);
        for (var base in main.cylinder.base) {
            main.cylinder.base[base].pointCollection =
                Helper.pointsTransformation(main.cylinder.base[base].pointCollection, rotateMatrix);
        }
        for (var base in main.cylinder.baseLineCollection) {
            main.cylinder.baseLineCollection[base].line =
                Helper.processArray(main.cylinder.baseLineCollection[base].line, rotateMatrix);
        }

        for (var base in main.cone.base) {
            main.cone.base[base].pointCollection =
                Helper.pointsTransformation(main.cone.base[base].pointCollection, rotateMatrix);
        }
        for (var base in main.cone.baseLineCollection) {
            main.cone.baseLineCollection[base].line =
                Helper.processArray(main.cone.baseLineCollection[base].line, rotateMatrix);
        }


        Settings.clearCanvas();
        main.cylinder.draw();
        main.cone.draw();
    };

    Rotator.prototype.getXmatrix = function(alpha){
        var a = Settings.degre(alpha);
        return [
            [1,0,0,0],
            [0, Math.cos(a), -1 * Math.sin(a),0],
            [0, Math.sin(a), Math.cos(a), 0],
            [0,0,0,1]
        ];
    };

    Rotator.prototype.getZmatrix = function (alpha){
        var a = Settings.degre(alpha);
        return [
            [Math.cos(a),Math.sin(a),0,0],
            [-1 * Math.sin(a), Math.cos(a), 0,0],
            [0,0,1, 0],
            [0,0,0,1]
        ];
    };

    Rotator.prototype.getYmatrix = function(alpha) {
        var a = Settings.degre(alpha);
        return [
            [Math.cos(a), 0, -1 * Math.sin(a), 0],
            [0, 1, 0, 0],
            [Math.sin(a), 0, Math.cos(a), 0],
            [0, 0, 0, 1]
        ];
    };

    return Rotator;
});