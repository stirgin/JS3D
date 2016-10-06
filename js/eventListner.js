define([
    'jquery',
    'underscore'
], function() {

    var keyEvent = {
        '0': {
            ArrowUp: function(){
                Mover.move(0, -3, 0);
            },
            ArrowDown: function(){
                Mover.move(0, 3, 0);
            },
            ArrowLeft: function(){
                Mover.move(-3, 0, 0);
            },
            ArrowRight: function(){
                Mover.move(3, 0, 0);
            }
        },
        '1': {
            ArrowUp: function(){
                Rotator.rotate(3, 'x');
            },
            ArrowDown: function(){
                Rotator.rotate(-3, 'x');
            },
            ArrowLeft: function(){
                Rotator.rotate(3, 'z');
            },
            ArrowRight: function(){
                Rotator.rotate(-3, 'z');
            }
        },
        '2': {
            ArrowUp: function(){
                Scale().scale(0.1);
            },
            ArrowDown: function(){
                Scale().scale(-0.1);
            }
        }
    };

    var EventListner = function() {
        return this;
    };

    EventListner.prototype.enterpress = function() {
        var that = this;
        $('body').on('keyup', function(e){
            that.enterpressListner(e);
        });
    };

    EventListner.prototype.onkeydown = function() {
        var that = this;
        document.onkeydown = function(e){
            Settings.updateGeneralData();
            that.onkeydownListner(e);
        }
    };

    EventListner.prototype.click = function() {
        var that = this;
        $('#myCanvas').on('mousedown', function(e) {
            that.clickListner(e);
        });
    };

    EventListner.prototype.contextClick = function() {
        var that = this;
        $('#myCanvas').bind('contextmenu', function(e){
            that.contextClick(e);
        })
    };

    EventListner.prototype.enterpressListner = function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            main.init();
        }
    };

    EventListner.prototype.clickListner = function (event) {
        switch (event.which) {
            case 1:
                //console.log('left');
                if (event.ctrlKey) {
                    this.getCenter(event);
                }

                break;
            case 2:
                console.log('middle');

                break;
            case 3:
                console.log('right');

                break;
            default:
                console.log('other click');
        }
    };

    EventListner.prototype.contextClickListner = function (event) {
        event.preventDefault();
        return false;
    };

    EventListner.prototype.getCenter = function (event) {
        event.preventDefault();
        var rect = Settings.canvas.getBoundingClientRect(),
            center = {
                x: event.clientX - rect.left,
                y: 0,
                z: event.clientY - rect.top + Settings.cylinder.h / 2
            };

        console.log('Center: ', center);
        Settings.clearCanvas();
        Settings.setCenterCoord(center);
        main.init();
    };

    EventListner.prototype.init = function() {
        this.enterpress();
        this.click();
        this.onkeydown();
    };

    EventListner.prototype.onkeydownListner = function(e) {
        var currState = keyEvent[Settings.moveVariant];
        if(currState){
            var handler = currState && currState[e.code];
            handler && handler();
        }
    };

    return EventListner;
});
