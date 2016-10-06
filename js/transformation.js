var Helper = (function() {
    var createMatrixFromPoint = function(point){
        return [point.x, point.y, point.z, 1];
    };

    var fromArrayToPoint = function(point, array){
        return new Point(array[0], array[1], array[2], 0);
    };

    var points = ['from', 'to'];

    var processSingleLine = function(line, moveMatrix){
        var newLine = {};
        for(var j = 0; j < points.length; ++j){
            var point = line[points[j]];
            var pointArray = createMatrixFromPoint(point);
            var _pointArray = math.multiply(pointArray, moveMatrix);
            newLine[points[j]] = fromArrayToPoint(point, _pointArray);
        }

        return newLine;
    };

    var processSinglePoint = function(point, moveMatrix) {
            var pointArray = createMatrixFromPoint(point);
            var _pointArray = math.multiply(pointArray, moveMatrix);

        return fromArrayToPoint(point, _pointArray);
    };

    return {
        processArray: function(lines, moveMatrix){
            var result = [];
            for(var i = 0; i < lines.length; ++ i){
                var line = lines[i];
                var newLine = processSingleLine(line, moveMatrix);
                result.push(newLine);
            }

            return result;
        },
        pointsTransformation: function(points, moveMatrix) {
            var result = [];
            for(var i = 0; i < points.length; ++ i){
                var point = points[i];
                var newPoint = processSinglePoint(point, moveMatrix);
                result.push(newPoint);
            }

            return result;
        }
    };
})();