function Scale(){
    
    var getScaleMatrix = function(k){
        var dk = 1 + k;
        return [
            [dk, 0,0,0],
            [0, dk, 0, 0],
            [0, 0, dk, 0],
            [0, 0, 0, 1]
        ]; 
    };

    return {
        scale: function(k){
            var scaleMatrix = getScaleMatrix(k);
            for (var base in main.cylinder.base) {
                main.cylinder.base[base].pointCollection =
                    Helper.pointsTransformation(main.cylinder.base[base].pointCollection, scaleMatrix);
            }
            for (var base in main.cylinder.baseLineCollection) {
                main.cylinder.baseLineCollection[base].line =
                    Helper.processArray(main.cylinder.baseLineCollection[base].line, scaleMatrix);
            }

            for (var base in main.cone.base) {
                main.cone.base[base].pointCollection =
                    Helper.pointsTransformation(main.cone.base[base].pointCollection, scaleMatrix);
            }
            for (var base in main.cone.baseLineCollection) {
                main.cone.baseLineCollection[base].line =
                    Helper.processArray(main.cone.baseLineCollection[base].line, scaleMatrix);
            }

            Settings.clearCanvas();
            main.cylinder.draw();
            main.cone.draw();
        }
    };
};