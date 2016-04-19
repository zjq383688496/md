"use strict";

/**
 * google map
 * @by zhuangjiaqi
 * @   2016.04.19
 */
var GMapUtil = {
	/*
	 * @method init					地图初始化
	 * @param  {string} container	传入容器id
	 * @param  {object} opt			地图属性
	 */
	_map: null,
	init: function (containerId, opt) {
		var _this = this;
		MDJS.load('GMap', function () {
			_this.initMap(containerId, opt);
		});
	},
	initMap: function (containerId, opt) {
		var container = document.getElementById(containerId);
		var lat = 35.86166;
		var lng = 104.195397;
		var myOptions = {
			maxZoom:           19,
			zoom:              3,
			mapTypeControl:    true,
			center:            myLatlng,
			scaleControl:      true,
			panControl:        false,
			streetViewControl: false
		};
		var myLatlng = new google.maps.LatLng(lat, lng);
		$.extend(myOptions, opt || {});
		this._map = new google.maps.Map(container, $.extend(myOptions, { center: myLatlng }));
		this._map.markers = this._map.markers || [];
		this._map.lines   = this._map.lines   || [];
		this._map.polygon = this._map.polygon || [];
	},
	getStatus: function () {
		return this.mapstatus? true: false;
	},
	/**
	 * @method setMap 修改当前map
	 */
	setMap: function (map) {
		this._map = map;
		this._map.markers = this._map.markers || [];
		this._map.lines   = this._map.lines   || [];
		this._map.polygon = this._map.polygon || [];
	},
	/**
	 * @method getMap 获取当前map
	 */
	getMap: function () {
		return this.map;
	},
	/**
	 * @method createLatLng			创建经纬度对象
	 * @param  {object}   opt.lat	经度
	 * @param  {object}   opt.lng	纬度
	 */
	createLatLng: function (opt) {
		return new google.maps.LatLng(opt.lat-0, opt.lng-0);
	},
	/*
	 * @method addMarker
	 * @param  {object} opt				传入参数
	 * @param  {number} opt.lat			经度
	 * @param  {number} opt.lng			纬度
	 * @param  {object} opt.icon		图片的参数
	 * @param  {string} opt.icon.url	图片地址
	 * @param  {object} opt.icon.point	点得参数 里面包含x,y 图片组件的横纵坐标
	 * @param  {object} opt.icon.size	图片大小 里面包含w,h
	 * @example
	 * {
			lat: 35.86166,
			lng: 104.195397,
			icon:{
				url: '',
				point:{
					x: 0,
					y: 0
				},
				size:{
					w: 18,
					h: 18
				}
			}
		}
	 */
	addMarker: function (opt) {
		var coordinates = this.createLatLng(opt);
		var markerOpt = {
			position: coordinates,
			map:      this._map
		};
		opt.icon && $.extend(markerOpt, { icon: this.createIcon(opt.icon) });
		var marker = new google.maps.Marker(markerOpt);
		this._map.markers.push(marker);

		return marker;
	},
	/*
	 * @method 创建 icon
	 * @private
	 * @param  {object} opt.icon		图片的参数
	 * @param  {string} opt.icon.url	图片地址
	 * @param  {object} opt.icon.point	点得参数 里面包含x,y 图片组件的横纵坐标
	 * @param  {object} opt.icon.size	图片大小 里面包含w,h
	 **/
	createIcon: function (opt) {
		var size  = new google.maps.Size(opt.size.w, opt.size.h);		//icon的尺寸
		var point = new google.maps.Point(opt.point.x, opt.point.y);	//icon的显示位置,图片精灵
		return new google.maps.MarkerImage(opt.url, size, point);
	},
	/*
	 * @public 
	 * @method 注册事件
	 * @param  {object}   google里的元素对象(比如：坐标)
	 * @param  {string}   type   事件类型：click,....
	 * @param  {function} callback 事件执行函数
	 **/
	addEvent: function (obj, type, callback) {
		google.maps.event.addListener(obj, type, function () {
			callback && callback.call(obj);
		});
	},
	/*
	 * @public 
	 * @method 删除事件，将会删除掉传入对象下，type事件类型对应的所有执行函数
	 * @param  {object}   google里的元素对象(比如：坐标)
	 * @param  {string}   type   事件类型：click,....
	 **/
	removeEvent: function (obj, type) {
		//这里暂时使用清除对象指定事件的所有监听函数
		google.maps.event.clearListeners(obj, type);
	},
	/*
	 * @method 根据坐标查找marker
	 * @private 
	 * @param   {object}   pos 		经纬度
	 * @param   {number}   pos.lat 	经度
	 * @param   {number}   pos.lng 	纬度
	 * @param   {string}   control 	控制是否删除“del” 如果是del则删除marker
	 * @return  {object}   marker对象
	 **/
	searchMarkerByPos: function (pos, control) {
		if (this._map.markers.length) {	
			var inpos = this.createLatLng(pos);
			var len = this._map.markers.length;
			for (var i = 0; i < len; i++) {
				var marker = this._map.markers[i];
				var p = marker.position;
				if (inpos.toString() === p.toString()) {
					if (control === 'del') {
						this._map.markers.splice(i, 1);
					}
					return marker;
				}
			}
		}
	},
	/*
	 * @method 替换marker的图标
	 * @param  {object}   pos				经纬度
	 * @param  {number}   pos.lat			经度
	 * @param  {number}   pos.lng			纬度
	 * @param  {object}   opt.icon			图片的参数
	 * @param  {string}   opt.icon.url		图片地址
	 * @param  {object}   opt.icon.point	点得参数 里面包含x,y 图片组件的横纵坐标
	 * @param  {object}   opt.icon.size		图片大小 里面包含w,h
	 **/
	changeMarkerIcon: function (pos, opt) {
		var marker = this.searchMarkerByPos(pos);
		marker && marker.setIcon(this.createIcon(opt.icon));
	}
}