var main, Settings, Mover, Rotator, Point;
requirejs([
    'main',
    'point',
    'settings',
    'event',
    'rotate',
    'mover',
    'scale',
    'helper'
], function(Main, PointClass, Sttng, EventListner, Rotate, Move) {
    Point = PointClass;
    Rotator = new Rotate();
    Mover = new Move();
    Settings = new Sttng(true);
    main = new Main();
    new EventListner().init();
});