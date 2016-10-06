define([
    'jquery',
    'underscore'
], function() {

    var Settings = function(mode) {
        var canvas;

        this.mode = (mode) ? 'development' : '';
        this.pointSize = 3;

        // general settings
        this.apprCoeffId = '#apprCoeff';
        this.canvasId = 'myCanvas';
        this.drawPointId = '#draw-point';
        this.drawLineId = '#draw-line';
        this.moveVariantId = '#moveVariant';

        //cylinder settings
        this.cylinerSettings = {
            upperRadiusId: '#cylinder-radius',   //R11
            lowerRadiusId: '#cylinder-radius',    //R12
            cylinerHeightId: '#cylinder-height'  //H1
        };

        //cone settings
        this.coneSettings = {
            radiusId: '#cone-radius',   //R2
            coneHeightId: '#cone-height'  //H2
        };

        this.$canvas = $('#' + this.canvasId);
        this.canvas = document.getElementById(this.canvasId);

        this.canvasContext = this.canvas.getContext("2d");

        this.setInitCenterCoord({
            width: this.$canvas.width(),
            height: this.$canvas.height()
        });

        this.updateData();
        return this;
    };

    Settings.prototype.updateData = function() {
        this.updateGeneralData();
        this.updateObjectData();
        this.clearCanvas();
    };

    Settings.prototype.updateGeneralData = function() {
        var ratio = 200,
            width = this.$canvas.width(),
            height = this.$canvas.height(),
            apprCoeff = this.getValue(this.apprCoeffId),
            alpha = 360 / apprCoeff;

        //get all settings
        this.apprCoeff = apprCoeff;
        this.alpha = alpha;

        this.offsetX = width / 2;
        this.offsetZ = height / 2;

        this.draw = {
            point: $(this.drawPointId).is(':checked'),
            line: $(this.drawLineId).is(':checked')
        };
        this.moveVariant = $(this.moveVariantId).val();
    };

    Settings.prototype.updateObjectData = function() {
        this.cylinder = {
            r1: this.getValue(this.cylinerSettings.upperRadiusId),   //R11
            r2: this.getValue(this.cylinerSettings.lowerRadiusId),    //R12
            h: this.getValue(this.cylinerSettings.cylinerHeightId),  //H1
            color: 'black'
        };

        this.cone = {
            r: this.getValue(this.coneSettings.radiusId),   //R2
            h: this.getValue(this.coneSettings.coneHeightId),  //H2
            color: 'green'
        };
    };

    Settings.prototype.setCenterCoord = function(o) {
        this.offsetX = o.x;
        this.offsetY = o.y;
        this.offsetZ = o.z;
    };

    Settings.prototype.setInitCenterCoord = function(o) {
        this.centerX = o.width / 2;
        this.centerY = 0;
        this.centerZ = o.height / 2;
    };

    Settings.prototype.degre = function(angle) {
        return angle * Math.PI / 180;
    };

    Settings.prototype.drawPoint = function(point) {
        var x = point.x,
            y = point.y;

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.getCoord(x, 'x'), this.getCoord(y, 'y'), this.pointSize, 0, 2 * Math.PI);
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };

    Settings.prototype.drawLine = function(line) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.getCoord(line.from.x, 'x'), this.getCoord(line.from.y, 'y'));
        this.canvasContext.lineTo(this.getCoord(line.to.x, 'x'), this.getCoord(line.to.y, 'y'));
        this.canvasContext.stroke();
    };

    Settings.prototype.changeColor = function(color) {
        this.canvasContext.strokeStyle = color;
        this.canvasContext.fillStyle = color;
    };

    Settings.prototype.clearCanvas = function() {
        this.canvasContext.clearRect(0, 0, this.$canvas.width(), this.$canvas.height());
    };

    //check on not '' or undefined
    Settings.prototype.getValue = function(el) {
        var $el = $(el),
            value = $el.val() * 1;
        return value || 1;
    };

    Settings.prototype.modeLog = function(str) {
        if (this.mode) {
           // console.log(str);
        }
    };

    Settings.prototype.getCoord = function(c, axis){
        return c + (axis === 'x' ? this.offsetX : this.offsetZ)
    };

    return Settings;
});

