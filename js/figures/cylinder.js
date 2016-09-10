define([
    'circle',
    'jquery',
    'underscore'
], function(Circle) {

    var Cylinder = function() {
        this.type = 'Cylinder';
        this.upperRadiusId = '#cylinder-radius';
        this.lowerRadiusId = '#cylinder-radius';
        this.heightId = '#cylinder-height';
        this.base = {
            upperBase: new Circle({
                type: 'upperCircle',
                radiusId: this.upperRadiusId,
                centerX: 400,
                centerY: 300,
                centerZ: 0
            }),
            lowerBase: {},
            sideSurface: {}
        };

        this.update();
        return this;
    };

    Cylinder.prototype.clear = function() {
        
        this.base.upperBase.clear();
        /*
        this.base.lowerBase.clear();
        this.base.sideSurface.clear();
        */
    };

    Cylinder.prototype.update = function() {
        this.base.upperBase.update();
        /*
        this.topRadius = $(this.topRadiusId).val() * 1;
        this.bottomRadius = $(this.bottomRadiusId).val() * 1;
        this.height = $(this.heightId).val() * 1;
        */
    };

    Cylinder.prototype.create = function() {
        this.base.upperBase.createCircle(this.centerX, this.centerY, this.radius);
    };

    
    
    return Cylinder;
});