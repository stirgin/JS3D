define([
    'jquery',
    'underscore'
], function() {
    var Mover = function() {
        return this;
    };

    Mover.prototype.createMoveMatrix = function(dx, dy, dz) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    };

    Mover.prototype.move = function(dx, dy, dz) {
        var moveMatrix = this.createMoveMatrix(dx, dy, dz);

        for (var base in main.cylinder.base) {
            main.cylinder.base[base].pointCollection =
                Helper.pointsTransformation(main.cylinder.base[base].pointCollection, moveMatrix);
        }

        for (var base in main.cylinder.baseLineCollection) {
            main.cylinder.baseLineCollection[base].line =
                Helper.processArray(main.cylinder.baseLineCollection[base].line, moveMatrix);
        }

        for (var base in main.cone.base) {
            main.cone.base[base].pointCollection =
                Helper.pointsTransformation(main.cone.base[base].pointCollection, moveMatrix);
        }

        for (var base in main.cone.baseLineCollection) {
            main.cone.baseLineCollection[base].line =
                Helper.processArray(main.cone.baseLineCollection[base].line, moveMatrix);
        }

        Settings.clearCanvas();
        main.cylinder.draw();
        main.cone.draw();
    };

    return Mover;
});
