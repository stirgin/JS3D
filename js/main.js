define([
	'settings',
	'cylinder',
	'jquery',
	'underscore'
], function(Settings, Cylinder) {

	var Main = function() {
		this.settings = new Settings();
		this.cylinder = new Cylinder();
		return this;
	};

	Main.prototype.run = function() {
		this.reinit();
		this.createAllDataObject();
		//this.draw();
		
		//objOfPoints.log();
	};

	Main.prototype.reinit = function() {
		this.settings.clearCanvas();
		this.settings.updateData();
		this.updateCylinderObject();
		this.clear();
	};

	Main.prototype.clear = function() {
		this.cylinder.clear();
	};

	Main.prototype.createAllDataObject = function() {
		this.cylinder.create();
	};

	Main.prototype.draw = function() {
		this.drawCirclePoint(objOfPoints);
		this.drawUnionOfCirclePoint(objOfPoints);
	};

	Main.prototype.updateCylinderObject = function() {
		this.cylinder.update();
	};


	////////////////

	var canv = $("#myCanvas");
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext("2d");
	var PI = Math.PI,
		alpha,
		pointSize = 3,
		settingsObject = {
			apprCoeff: 0,
			pointDraw: true,
			lineDraw: false
		},
		cylinderObject = {
			
		},
		coneObject = {},
		objOfPoints = {
			pointId: 0,
			collection: [],
			createPointObject: function(x, z) {
				this.pointId++;
				var obj = {
					id: this.pointId,
					x: x,
					y: 0,
					z: z
				};
				this.collection.push(obj);
			},
			log: function() {
				console.log(this.collection);
			}
		},
		pointId = 0,
		cylinderRadius = $('#cylinder-radius').val() * 1,
		cylinderHeight = $('#cylinder-height').val() * 1,
		n = $('#apprCoeff').val() * 1,
		centerX = canv.width() / 2,
		centerZ = canv.height() / 2;


	Main.prototype.line = function(pointStart, pointEnd) {
		ctx.beginPath();
		ctx.fill();
		ctx.moveTo(pointStart.x, pointStart.z);
		ctx.lineTo(pointEnd.x, pointEnd.z);
		ctx.closePath();
		ctx.stroke();
	};

	Main.prototype.createPoint = function(point) {
		ctx.beginPath();
		ctx.arc(point.x, point.z, pointSize, 0, 2 * PI);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	};

	Main.prototype.getX = function(radius, alpha) {
		return (centerX + radius * Math.cos(degre(alpha))).toFixed(3);
	};

	Main.prototype.getZ = function(radius, alpha) {
		return (centerZ + radius * Math.sin(degre(alpha))).toFixed(3);
	};

	Main.prototype.drawCirclePoint = function(pointObject) {
		var length = pointObject.collection.length,
			point;

		for(var i = 0; i < length; ++i) {
			point = pointObject.collection[i];
			createPoint(point);
		}
	};

	Main.prototype.drawUnionOfCirclePoint = function(pointObject) {
		var pointCount = pointObject.collection.length,
			lineCount = pointCount - 1,
			startPoint = pointObject.collection[0],
			firstPoint = startPoint,
			endPoint;

		for(var i = 0; i < lineCount; i++) {
			endPoint = pointObject.collection[i + 1];
			line(startPoint, endPoint);
			startPoint = endPoint;
		}
		line(endPoint, firstPoint);
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

/*
$('#run').on('click', function() {
ctx.clearRect(0, 0, canv.width(), canv.height());
});
*/