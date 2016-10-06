requirejs.config({
    baseUrl: '../js',
    paths: {
        //plugins
        'jquery': 'plugins/jquery-3.1.0',
        'angular': 'plugins/angular-1.0.1',
        'underscore': 'plugins/underscore',

        'main': 'main',
        
        //fugure
        'point': 'figures/point',
        'abstract': 'figures/abstract',
        'circle': 'figures/circle',
        'cone': 'figures/cone',
        'cylinder': 'figures/cylinder',

        //settings
        'settings': 'settings',
        'event': 'eventListner',
        'rotate': 'rotate',
        'mover': 'mover',
        'helper': 'transformation',
        'scale': 'scaleHandler'
    }
});
