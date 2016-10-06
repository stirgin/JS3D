define([
	'cylinder',
	'cone',
	'jquery',
	'underscore'
], function(Cylinder, Cone) {

	var Main = function() {
		return this;
	};

	Main.prototype.init = function() {
		this.cylinder = new Cylinder();
		this.cone = new Cone();

		this.run();
	};

	Main.prototype.run = function() {
		this.createAllDataObject();
		this.drawAllDataObject();
	};

	Main.prototype.createAllDataObject = function() {
		this.cylinder.create();
		this.cone.create();
	};

	Main.prototype.drawAllDataObject = function() {
		this.cylinder.draw();
		this.cone.draw();
	};

	return Main;
});


/*
TODO:

сделать запись точек а после построение линий из данных этого объекта
потом будем строить новый объект на основании точек линии ссылающиеся на точки

в итоге будем получать сначала подсчет всех координат, после делаем отображение

- реализовать три объекта settingsObject, cylinderObject, coneObject, для двух последних один абстрактный;
- подсчет вынести на backend
*/
