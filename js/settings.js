define([
    'jquery',
    'underscore'
], function() {

    var Settings = function(mode) {
        this.mode = (mode) ? 'development' : '';
        this.pointSize = 5;
        this.PI = Math.PI;

        //string property;
        this.apprCoeffId = '#apprCoeff';
        this.canvasId = '#myCanvas';

        this.updateData();
        return this;
    };

    Settings.prototype.degre = function(angle) {
        return angle * this.PI / 180;
    };

    Settings.prototype.drawPoint = function(x, y) {
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.pointSize, 0, 2 * this.PI);
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };

    Settings.prototype.updateData = function() {
        //get all settings
        this.apprCoeff = this.getValue(this.apprCoeffId);
        this.alpha = 360 / this.apprCoeff;

        this.$canvas = $(this.canvasId);

        var canvas = document.getElementById('myCanvas');
        this.canvasContext = canvas.getContext("2d");
        this.clearCanvas();
    };

    Settings.prototype.clearCanvas = function() {
        var width = this.$canvas.width(),
            height = this.$canvas.height();
        
        this.canvasContext.clearRect(0, 0, width, height);
    };

    //check on not '' or undefined
    Settings.prototype.getValue = function(el) {
        var $el = $(el),
            value = $el.val() * 1;
        return value || 1;
    };

    //check on not '' or undefined
    Settings.prototype.modeLog = function(str) {
        if (this.mode) {
            console.log(str);
        }
    };

    return Settings;
});

