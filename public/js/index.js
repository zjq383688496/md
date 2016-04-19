var lists = [
	{
		"id": "59437",
		"cn": "曼谷大皇宫",
		"en": "The Grand Palace",
		"points": "8.6",
		"count": "2318",
		"url": "http://place.qyer.com/poi/V2EJalFiBzVTYw/",
		"position": {
			"x": "13.749997",
			"y": "100.491997"
		},
		"rank": {
			"place": "曼谷",
			"catename": "景点观光",
			"position": "1"
		},
		"intro": "大皇宫也叫大王宫，泰王室规模最大的宫殿建筑群，汇集了泰国建筑、装饰、雕刻、绘画等...",
		"photo": "http://pic.qyer.com/album/user/214/41/Q0hRRhsHYQ/index/225x150"
	},
	{
		"id": "58525",
		"cn": "玉佛寺",
		"en": "Wat Phra Kaew",
		"points": "8.7",
		"count": "1051",
		"url": "http://place.qyer.com/poi/V2EJa1FjBzRTYQ/",
		"position": {
			"x": "13.751416",
			"y": "100.492561"
		},
		"rank": {
			"place": "曼谷",
			"catename": "景点观光",
			"position": "2"
		},
		"intro": "玉佛寺建于1782年，历史相当悠久，属于泰国曼谷王朝开朝时建筑。\n拉玛一世是首位将泰...",
		"photo": "http://pic.qyer.com/album/1ca/5d/1991409/index/225x150"
	},
	{
		"id": "260850",
		"cn": "曼谷卧佛寺",
		"en": "Temple of the Reclining Buddha (Wat Pho)",
		"points": "8.6",
		"count": "787",
		"url": "http://place.qyer.com/poi/V2YJZVFmBz5TYVI_/",
		"position": {
			"x": "13.746575",
			"y": "100.492729"
		},
		"rank": {
			"place": "曼谷",
			"catename": "景点观光",
			"position": "3"
		},
		"intro": "泰国卧佛寺寺位于大皇宫隔壁的卧佛寺又称菩提寺，卧佛寺是全曼谷最古老的庙，也是全泰...",
		"photo": "http://pic1.qyer.com/album/user/555/78/RExQRRIOaQ/index/225x150"
	},
	{
		"id": "39329",
		"cn": "考山路",
		"en": "Khao San Road",
		"points": "8.0",
		"count": "927",
		"url": "http://place.qyer.com/poi/V2cJalFlBzRTbQ/",
		"position": {
			"x": "13.759009",
			"y": "100.497032"
		},
		"rank": {
			"place": "曼谷",
			"catename": "休闲娱乐",
			"position": "4"
		},
		"intro": "因为毗邻旅游景点如大皇宫 (Grand Palace) 、国家博物馆及美术馆，考山路一直受到背包...",
		"photo": "http://pic2.qyer.com/album/user/592/78/REBXRRIPZg/index/225x150"
	},
	{
		"id": "38090",
		"cn": "伊拉旺神祠四面佛",
		"en": "Erawan Shrine",
		"points": "8.7",
		"count": "820",
		"url": "http://place.qyer.com/poi/V2cJa1FmBz9TZA/",
		"position": {
			"x": "13.744280",
			"y": "100.540451"
		},
		"rank": {
			"place": "曼谷",
			"catename": "景点观光",
			"position": "7"
		},
		"intro": "人称“有求必应”佛，泰国香火最盛的佛像之一，以灵验著称。每天都有很多来自世界各地...",
		"photo": "http://pic1.qyer.com/album/user/214/41/Q0hRRhsGaQ/index/225x150"
	}
];

MDJS.load('map', function () {
	GMapUtil.init('GMap');
});

// define(function(){
// 	/**
// 	*@function setList
// 	*/
// 		var styles=[ 
// 				{ 
// 					featureType: "road.highway", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#b2dab8" } 
// 					] 
// 				},{ 
// 					featureType: "road.arterial", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#FFFFFF" }, 
// 						{ weight: 0.9 } 
// 					] 
// 				},{ 
// 					featureType: "road.local", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#dddddd" }, 
// 						{ weight: 0.8 } 
// 					] 
// 				},{ 
// 					featureType: "poi.park", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#bdcd62" } 
// 					] 
// 				},{ 
// 					featureType: "water", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#bcd4e0" } 
// 					] 
// 				},{ 
// 					featureType: "poi.business", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "off" } 
// 					] 
// 				},{ 
// 					featureType: "poi.government", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "off" } 
// 					] 
// 				},{ 
// 					featureType: "poi.place_of_worship", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "off" } 
// 					] 
// 				},{ 
// 					featureType: "poi.school", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "off" } 
// 					] 
// 				},{ 
// 					featureType: "poi.attraction", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "off" } 
// 					] 
// 				},{ 
// 					featureType: "poi.sports_complex", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#bdcd62" } 
// 					] 
// 				},{ 
// 					featureType: "landscape.man_made", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ color: "#efefef" } 
// 					] 
// 				},{ 
// 					featureType: "landscape.man_made", 
// 					elementType: "labels.text.fill", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ gamma: 3.6 } 
// 					] 
// 				},{ 
// 					featureType: "landscape.natural", 
// 					elementType: "geometry", 
// 					stylers: [ 
// 						{ visibility: "on" }, 
// 						{ saturation: -100 } 
// 					] 
// 				} 
// 			]
// 	function setList(settings,container,clear,callback,poiStatus,res){
// 		var res = res||false;
// 		/**
// 		*分类的各种值 
// 		*@class sortClass
// 		*/
// 		window._settings = settings;
// 		window._settings.id = PLACE.PID;
// 		window._settings.typename = PLACE.TYPE;
// 		var sortClass = {
// 			"all":"全部",
// 			"sight":"景点",
// 			"food":"美食",
// 			"shopping":"购物",
// 			"activity":"活动",
// 			"transport":"交通"
// 		};
// 		// settings.id = PLACE.PID;
// 		// settings.typename = PLACE.TYPE;
// 		/**
// 		*创建旅行地列表callback
// 		*@function placeListCallback
// 		*/

// 		var placeListCallback = function(data,clear){
// 			mapView.closeInfoWindow();
// 			markerArr = [];tempArr = [];
// 			container.empty().removeClass("qmap-poiLoading");
// 			if (container.next(".ui_page").length>0) container.next(".ui_page").remove();
// 			setInfo(data);
// 			if (data.res=="no") {
// 				if (window.mapIsReady && window.gmap){
// 					mapUtils.empty();
// 				} else {
// 					require(["common/ui/gmap/gmap"], function(mapUtils){
// 						mapUtils.init("map");
// 						$(mapUtils).on("mapalready",function(){
// 							window.mapIsReady = true;
// 							window.mapUtils = mapUtils;
// 							//mapView.bindGMapEvent();
// 							if(globalCoord.lat==""||globalCoord.lat==undefined||globalCoord.lat==null||globalCoord.lng==""||globalCoord.lng==undefined||globalCoord.lng==null){
// 									var lat = 39.92, lng = 116.46;
// 								}else{
// 									var lat = globalCoord.lat,
// 									lng = globalCoord.lng
// 								}
								
// 							window.gmap = mapUtils.getMap();
// 							if(window._CountryId!=233){
// 								window.gmap.setOptions({styles: styles});
// 							}
// 							mapUtils.setCenter([{lat:lat,lng:lng}]);
// 							mapUtils.setZoom(12);
// 						});
// 					})
// 				}
// 				var lists = $(data.lists);
// 				container.append(lists);
// 				lists.find("a").off("click").on("click",function(){
					
// 					$("#filterNav").next(".criteria").show();
// 					$("#filterNav").next(".criteria").next(".searchbox").hide();
// 					$('#searchinput').qyerInputValidation("clear");
// 					$("#searchinput").attr("data-id","").val("");

// 					require(["project/js/mapPlaceListTPL"],function(mpl){
// 						container.addClass("qmap-poiLoading").empty();
// 						if(container.next(".ui_page").length>0){container.next(".ui_page").remove();}
						
// 						if(window._settings.keyword){delete window._settings.keyword}
// 						if(window._settings.min_lat){delete window._settings.min_lat}	
// 						if(window._settings.min_lng){delete window._settings.min_lng}	
// 						if(window._settings.max_lat){delete window._settings.max_lat}	
// 						if(window._settings.max_lng){delete window._settings.max_lng}
// 						window._settings.cateid = 0;
// 						window._settings.page = 1;
// 							cityStatus["firstCome"] = true;
// 							res = false;
// 						$("#filterNav").find(".ui_btn_small").removeClass("ui_btn_small");
// 						$("#filterNav").find("li").eq(0).find("a").addClass("ui_btn_small");
						
// 						mpl(window._settings,placeListCallback);
// 					});
// 				})
// 				return;
// 			}
// 			$(data.lists).appendTo(container);
// 			if(data.pageHTML){
				
// 					if(container.next(".ui_page").length>0){container.next(".ui_page").remove();}
// 					var pageHTML = $(data.pageHTML);
// 					pageHTML.insertAfter(container);
// 					pageBindEvent(pageHTML,clear);
				
// 			}
			
// 			if($.isFunction(callback)){
// 				callback(container.find("li"));
// 			}
// 			poiStatus.isDisableBtn(container);
// 			if(window.mapIsReady&&window.gmap){
// 				mapView.inition(data);
// 			}else{
// 				require(["common/ui/gmap/gmap"],function(mapUtils){
					
// 					mapUtils.init("map");
// 					$(mapUtils).on("mapalready",function(){
// 						window.mapIsReady = true;
// 						window.mapUtils = mapUtils;
// 						if(globalCoord.lat==""||globalCoord.lat==undefined||globalCoord.lat==null||globalCoord.lng==""||globalCoord.lng==undefined||globalCoord.lng==null){
// 							var lat = 39.92, lng = 116.46;
// 						}else{
// 							var lat = globalCoord.lat,
// 							lng = globalCoord.lng
// 						}
// 						mapUtils.fitBounds({lat:lat,lng:lng});
// 						window.gmap = mapUtils.getMap();
// 						if(window._CountryId!=233){
// 							window.gmap.setOptions({styles: styles});
// 						}
// 						mapView.inition(data);
// 						mapView.bindGMapEvent();
// 					});
					
// 				})
				
// 			}
// 		}
// 		/**
// 		*@method pageBindEvent
// 		*/
// 		var pageBindEvent = function(page,clear){
// 			page.on("click",".ui_page_item",function(){
// 				if($(this).hasClass("ui_page_item_current")) return false;
// 				var pageNumber = $(this).attr("data-page");
// 				window._settings.page = pageNumber;
// 				require(["project/js/mapPlaceListTPL"],function(mpl){
// 					container.addClass("qmap-poiLoading");
// 					if(container.next(".ui_page").length>0){container.next(".ui_page").remove();}
// 					if(!clear){
// 						container.empty();
// 					}
// 					mpl(window._settings,placeListCallback);
// 				});
// 			})
// 		}
// 		/**
// 		*创建旅行地列表
// 		*/	
// 		require(["project/js/mapPlaceListTPL"],function(mpl){
// 			container.addClass("qmap-poiLoading").empty();
// 			if(res&&window.mapIsReady&&window.gmap){
// 				var bounds = mapUtils.map.getBounds();
// 				window._settings.page = 1;
// 				mapView.isFitBounds = false;
// 		    	window._settings.min_lat = bounds.getSouthWest().lat();
// 		    	window._settings.min_lng = bounds.getSouthWest().lng();
// 				window._settings.max_lat = bounds.getNorthEast().lat();
// 				window._settings.max_lng = bounds.getNorthEast().lng();
// 			}
// 			if(container.next(".ui_page").length>0){
// 				container.next(".ui_page").remove();
// 			}
// 			mpl(window._settings,placeListCallback);
// 		});
// 		/**
// 		*当前的信息设置一下
// 		*@method setInfo
// 		*/
// 		var  setInfo = function(data){
// 			$("#criteria").find("span.fontYaHei").html(sortClass[data.data.data.sort]+'('+data.data.data.sum+'个)');
// 		}
// 		var cityStatus = {firstCome:true}
// 		/**
// 		*地图点点事件
// 		*@class mapPoint
// 		*/
		
// 		var mapView = {
// 			inition:function(data){
// 				mapUtils.empty();
// 				mapView.bindEvent(data);
// 				//mapUtils.setMap(gmap);
// 				google.maps.event.addListener(gmap,"click",function(overlay,latlng){
// 					//infoWindow.close();
// 					mapView.closeInfoWindow();
// 				});
// 			},
// 			isFitBounds:true,
// 			bindGMapEvent:function(){
// 				var me = this,
// 				 timer = null,
// 				 timer2 = null;
// 				function loadData(){
// 					var bounds = mapUtils.map.getBounds();
// 					mapView.isFitBounds = false;
// 			    	window._settings.min_lat = bounds.getSouthWest().lat();
// 			    	window._settings.min_lng = bounds.getSouthWest().lng();
// 			    	window._settings.max_lat = bounds.getNorthEast().lat();
// 			    	window._settings.max_lng = bounds.getNorthEast().lng();
// 			    	window._settings["page"] = 1;
// 			    	require(["project/js/mapPlaceListTPL"],function(mpl){
// 						container.addClass("qmap-poiLoading").empty();
// 						if(container.next(".ui_page").length>0){container.next(".ui_page").remove();}
// 						mpl(window._settings,placeListCallback);
// 					});

// 				}
// 				//google.maps.event.clearListeners(mapUtils.map,"zoom_changed");
// 				//google.maps.event.clearListeners(mapUtils.map,"dragend");
// 				// google.maps.event.clearListeners(mapUtils.map,"bounds_changed");
// 				 google.maps.event.addListener(mapUtils.map,"bounds_changed",function(){
// 				 	cityStatus.firstCome = false;
// 				 	mapView.isFitBounds = false;
// 				 });
// 				google.maps.event.addListener(mapUtils.map,"drag",function(){
// 					mapView.isFitBounds = false;
// 				});
// 				google.maps.event.addListener(mapUtils.map,"dragend",function(){
// 					mapView.isFitBounds = false;
// 					//loadData();
// 					if (typeof timer2 === 'number') {
// 				        clearTimeout(timer);
// 				    }
// 				    if(window.nofit){
// 						return;
// 					}
// 				    timer2 = setTimeout(function () {
// 				        //添加onscroll事件处理
// 				        mapView.isFitBounds = false;
// 				        loadData();
// 				    }, 100);
// 				})
// 				google.maps.event.addListener(mapUtils.map,"zoom_changed",function(){
// 					if(cityStatus.firstCome){
// 						//cityStatus.firstCome = false;
// 						return;
// 					}
// 					if(window.nofit){
// 						return;
// 					}
// 					//cityStatus.firstCome = false;
// 					// 稀释处理
// 					if (typeof timer === 'number') {
// 				        clearTimeout(timer);
// 				    }
// 				    timer = setTimeout(function () {
// 				        //添加onscroll事件处理
// 				        loadData();
// 				    }, 200);
// 				})
// 			},
// 			/**
// 			*@method 创建地图上的点
// 			*/
// 			createPoint:function(coordinate,pos,d){
// 				var str = ['<div class="qmap-card">',
// 							'	<p><a href="'+d.url+'" target="_blank"><img class="coverphoto" data-bn-ipg="place-citymap-poi-poicard-pic" src="'+d.photo+'" data-bn-ipg="place-citymap-poi-poicard-pic"/></a></p>',
// 							'	<dl>',
// 							'		<dt class="fontYaHei" data-bn-ipg="place-citymap-poi-poicard-name"><a href="'+d.url+'" target="_blank">'+(d.cn?d.cn:d.en)+'</a></dt>',
// 							'		<dd>',
// 							'			<p class="rank">',
// 							'				<img src="http://place.qyerstatic.com/project/images/map/icon-rank.png"/>'+d.rank.place+''+d.rank.catename+'中排名<em class="yellow">'+((d.rank.position=="暂无")?d.rank.position:("第"+d.rank.position+"名"))+'</em>',
// 							'			</p>',
// 							'			<p class="detail">'+d.intro+'</p>',
// 							'		</dd>',
// 							'	</dl>',
// 							'	<table cellpadding="0" cellspacing="0" border="0" width="100%">',
// 							'		<tr>',
// 							'			<td>',
// 							'				<a data-bn-ipg="place-citymap-poi-poicard-detail" href="'+d.url+'" target="_blank">'+d.rank.catename+'详情</a>',
// 							'			</td>',
// 							'			<td>',
// 							'				<a href="javascript:void(0)" data-ipg-add="place-citymap-travel-mapwishto-add" data-ipg-delete="place-citymap-travel-mapwishto-delete" data-id="'+d.id+'" data-status="'+d.planto_go+'" onclick="addToLikeList(this)" >'+(d.planto_go?"取消想去":"加入想去")+'</a>',
// 							'			</td>',
// 							'		</tr>',
// 							'	</table>',
// 							'</div>',
// 							'<div style="text-align:center;"><img src="http://place.qyerstatic.com/project/images/map/icon-arrow.png"></div>'
// 							].join('');
// 				var mopt = {
// 					icon:{
// 						url:"http://place.qyerstatic.com/project/images/map/map_ico.png",
// 						size:{
// 							w:27,
// 							h:32
// 						},
// 						point:{
// 							x:0,
// 							y:32*pos
// 						}
// 					}
// 				}
// 				mopt.lat = coordinate.x;
// 				mopt.lng = coordinate.y;
// 				mapUtils.addMarker(mopt);
// 				var marker = mapUtils.searchMarkerByPosition({"lat":coordinate.x,"lng":coordinate.y});
// 				var infoWindow=mapUtils.createDiyInfoWindow({"content":str,pixelOffset: new google.maps.Size(-115, -65)});
// 				var latlng = {
// 							lat:coordinate.x,
// 							lng:coordinate.y
// 						}
// 				mapUtils.addEvent(marker,"click",function(e){
// 					mapView.closeInfoWindow();
// 					infoWindow.open(mapUtils.map,marker);
// 					window.updateTable();
// 					tempArr.push(pos);
// 					mapView.showTag(latlng,1,{x:0,y:0},(parseInt(pos,10)+1));
// 					mapUtils.removeEvent(marker,"mouseout");
// 					mapView.addBigTag(pos);
// 					var $this = container.find("[tid="+d.id+"]");
// 					$this.addClass("qmap-listStyleOut");
// 					container.parent().scrollTop(($this.index()-1)*109);
// 				});
// 				mapUtils.addEvent(marker,"mouseover",function(e){
// 					mapView.showTag(latlng,1,{x:0,y:0},(parseInt(pos,10)+1));
// 					container.find("[tid="+d.id+"]").addClass("qmap-listStyleOut");
// 				});
// 				mapUtils.addEvent(marker,"mouseout",function(e){
// 					mapView.showTag(latlng,2,{x:0,y:32*pos},"no");
// 					container.find("[tid="+d.id+"]").removeClass("qmap-listStyleOut");
// 				});
// 				markerArr[pos] = {"infoWindow":infoWindow,"marker":marker,"latlng":latlng};
// 			},
// 			/**
// 			*@method 关闭谷歌地图上面的弹窗
// 			*/
// 			closeInfoWindow:function(){
// 				container.find(".qmap-listStyleOut").removeClass("qmap-listStyleOut");
// 				if(tempArr.length>0){
// 					$.each(tempArr,function(i,d){
// 						markerArr[d].infoWindow.close();
// 						mapView.showTag(markerArr[d].latlng,2,{x:0,y:32*d},"no");
// 						mapUtils.addEvent(markerArr[d].marker,"mouseout",function(e){
// 							mapView.showTag(markerArr[d].latlng,2,{x:0,y:32*d},"no");
// 						});
// 						mapView.removeBigTag(d);
// 					});
// 					tempArr = [];
// 				}
// 			},
// 			/**
// 			*@method 绑定列表上的各种事件
// 			*/
// 			bindEvent:function(data){
// 				var lists = data.data.data.lists;
// 				/**
// 				*所有的点打到地图上
// 				*/
// 				mapUtils.empty();
// 				var bounds = [];
// 				$.each(lists,function(i,d){
// 					mapView.createPoint(d.position,i,d);
// 					bounds.push({"lat":d.position.x,"lng":d.position.y});
// 				});
// 				/**
// 				*调整比例尺
// 				*/
// 				if(mapView.isFitBounds&&!res||cityStatus.firstCome&&!res){
// 					mapUtils.fitBounds(bounds);
// 				}
// 				/**
// 				*列表选中\取消选中事件绑定
// 				*/
// 				$("#mapPlaceList").off("click",".cb").on("click",".cb",function(e){
// 					var me = $(this).parent();
// 					if(me.hasClass("qmap-listStyleOn")){
// 						me.removeClass("qmap-listStyleOn");
// 						me.find(".cb input").prop("checked",false);
// 						poiStatus.deletePoi(me);
// 					}else{
// 						me.addClass("qmap-listStyleOn");
// 						me.find(".cb input").prop("checked",true);
// 						poiStatus.addPoiToTemp(me);
// 					}
// 					poiStatus.isDisableBtn(container);
// 				});
// 				$("#mapPlaceList").off("mouseenter",".detail").on("mouseenter",".detail",function(){
// 						var me = $(this);
// 						if(me.parents("li").hasClass("bigTag")){return;}
// 						var n = me.parent().index();
// 						var latlng = {
// 							lat:me.parent().attr("data-x"),
// 							lng:me.parent().attr("data-y")
// 						}
// 						mapView.showTag(latlng,1,{x:0,y:0},(parseInt(n,10)+1));
// 				})
// 				$("#mapPlaceList").off("click",".detail").on("click",".detail",function(){
// 					var me = $(this);
// 					if(me.parents("li").hasClass("bigTag")){
// 						return;
// 					}
// 					mapView.closeInfoWindow();
// 					tempArr.push(me.parents("li").index());
// 					var marker = markerArr[me.parents("li").index()].marker;
// 					markerArr[me.parents("li").index()].infoWindow.open(mapUtils.map,marker);
// 					window.updateTable();
// 					mapView.addBigTag(me.parents("li").index());
// 					mapUtils.removeEvent(marker,"mouseout");
// 				})
// 				$("#mapPlaceList").off("mouseleave",".detail").on("mouseleave",".detail",function(){
// 					var me = $(this);
// 					if(me.parents("li").hasClass("bigTag")){return;}
// 					var n = me.parent().index();
// 					var latlng = {
// 							lat:me.parent().attr("data-x"),
// 							lng:me.parent().attr("data-y")
// 						}
// 					mapView.showTag(latlng,2,{x:0,y:32*n},"no")
// 				})
// 			},
// 			/**
// 			*@method showBigTag 地图上的点变大
// 			*@param latlng {object} 坐标点lat lng {lat:"111",lng:"222"}
// 			*@param size {number} 地图上显示标签的大小，如果传1代表大标签，如果传其它的代表小标签
// 			*@param point {object} 地图上标签的背景位置
// 			*@param n {number} 坐标点上显示的数字
// 			*/
// 			showTag:function(latlng,size,point,n){
// 				var url = "http://place.qyerstatic.com/project/images/map/map_ico.png";
// 				if(n!="no"&&(typeof(n)!="undefined")){
// 					url = "http://place.qyerstatic.com/project/images/map/map_largeIco"+n+".png";
// 				}
// 				if(size==1){
// 					var getsize = {w:46,h:63}
// 				}else{
// 					var getsize = {w:27,h:32}
// 				}
// 				mapUtils.changeMarkerIcon(latlng,{
// 					icon:{
// 						"url":url,
// 						"size":getsize,
// 						"point":point
// 					}
// 				});
// 			},
// 			addBigTag:function(index){
// 				container.find("li").eq(parseInt(index,10)).addClass("bigTag");
// 			},
// 			removeBigTag:function(index){
// 				container.find("li").eq(parseInt(index,10)).removeClass("bigTag");
// 			}
// 		}		
// 	}
// 	return setList;
	
// })





/**
 * google map 工具类
 * @static
 * @author zhuwenxuan
 * @date   2014.10.16   
 */
// define(function(){
// 	var GMapUtils = {

// 		/**
// 		 * @method getMap 获取操作的map
// 		 */
// 		getMap:function(){
// 			return this.map;
// 		},

// 		/*
// 		 *@method 根据坐标查找marker
// 		 *@private 
// 		 *@param   {object}   pos    经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 *@param   {string}   control   控制是否删除“del” 如果是del则删除marker
// 		 *@return  {object}    marker对象
// 		 **/
// 		searchMarkerByPosition:function(pos,control){
// 			if(this.map.markers.length>0){	
// 				var marker,p,
// 					inpos = this.createLatLng(pos);
// 				for(var i = 0;i<this.map.markers.length;i++){
// 					marker = this.map.markers[i];
// 					p = marker.position;
// 					if(inpos.toString()==p.toString()){
// 						if(control&&control=="del"){
// 							this.map.markers.splice(i,1);
// 						}
// 						return marker;
// 					}
// 				}
// 			}
// 		},

// 		/*
// 		 *@method  替换marker的图标
// 		 *@param   {object}   pos    经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 * @param  {object} opt.icon   图片的参数
// 		 * @param  {string} opt.icon.url   图片地址
// 		 * @param  {object} opt.icon.point 点得参数 里面包含x,y 图片组件的横纵坐标
// 		 * @param  {object} opt.icon.size  图片大小 里面包含w,h
// 		 **/
// 		changeMarkerIcon:function(pos,opt){
// 			var marker = this.searchMarkerByPosition(pos);
// 			marker.setIcon(this.getIcon(opt.icon))
// 		},
//         /*
// 		 *@method  showInfoWindow 根据传入的坐标点，显示对应的信息弹层
// 		 *@param   {object}   经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 **/
// 		showInfoWindow:function(pos){
// 			var marker = this.searchMarkerByPosition(pos);
// 			marker.infoWindow.open(this.map,marker);
// 		},
//         /*
// 		 *@method  closeInfoWindow  根据传入的坐标点，隐藏对应的信息弹层
// 		 *@param   {object}   经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 **/
// 		closeInfoWindow:function(pos){
// 			var marker = this.searchMarkerByPosition(pos);
// 			marker.infoWindow.close();
// 		},
// 		/*
// 		 *@method  删除标记
// 		 *@param   {object}   经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 **/
// 		delMarker:function(pos){
// 			var marker = this.searchMarkerByPosition(pos,"del");
// 			marker.setMap(null);
// 		},
// 		/*
//  		 *@method 画线
//  		 *@param   {object}   经纬度
// 		 *    @param   {number}   pos.lat   经度
// 		 *    @param   {number}   pos.lng   纬度
// 		 *@param   {object}   线的属性 
// 		 *@param   {string}   opt.strokeColor    线的颜色   exp:#FF0000
// 		 *@param   {number}   opt.strokeOpacity  透明度   exp:0.5
// 		 *@param   {number}   opt.strokeWeight   宽度    exp:5
// 		 **/
// 		drawLine:function(pos,opt){
// 			var me = this,points = [],line;
// 			for(var i=0,p;p = pos[i++];){
// 				points.push(new google.maps.LatLng(p.lat, p.lng))
// 			}
// 			$.extend(opt,{
// 				path:points
// 			})
// 			line = new google.maps.Polyline(opt);
// 			line.setMap(this.map);
// 			this.map.lines.push(line);
// 			return line;
// 		},
//         /*
//  		 *@method 画面
//  		 *@param   {array}   经纬度对象的数组
// 		 *@param   {object}   线的属性 
// 		 *@param   {string}   opt.strokeColor    线的颜色   exp:#FF0000
// 		 *@param   {number}   opt.strokeOpacity  透明度   exp:0.5
// 		 *@param   {number}   opt.strokeWeight   宽度    exp:5
// 		 **/
// 		drawPolygon:function(pos,opt){
// 			var bounds = [],latlng,polygon;
// 			for(var i=0;i<pos.length;i++){
// 				latlng = pos[i].split(",");
// 				bounds.push(this.createLatLng({
// 					lat:latlng[0],
// 					lng:latlng[1]
// 				}))
// 			}
// 			polygon = new google.maps.Polygon($.extend(opt,{
// 				paths:bounds
// 			}))
// 			polygon.setMap(this.map);
// 			this.map.polygon.push(polygon);
// 			return polygon;
// 		},
//         /*
// 		 * @method fitBounds 根据传入的经纬度数组设置最优视图
//          * @param   {array}   latlngs    经纬度对象的数组
// 		 **/
// 		fitBounds:function(latlngs){
// 			//[{lat:123,lng:234},{lat:2134,lng:234}]
// 			var mapBounds =new google.maps.LatLngBounds();
// 			for(var i =0;i<latlngs.length;i++){
// 				mapBounds.extend(this.createLatLng(latlngs[i]))
// 			}
// 			this.map.fitBounds(mapBounds);
// 		},
// 		setCenter:function(latlngs){
// 			//[{lat:123,lng:234},{lat:2134,lng:234}]
// 			var lat = lng = 0;
			
// 			for(var i =0, len = latlngs.length;i<len;i++){
// 				var latlng = latlngs[i];
// 				lat += latlng.lat-0;
// 				lng += latlng.lng-0;
// 			}
// 			lat = lat/len;
// 			lng = lng/len;
// 			this.map.setCenter(new google.maps.LatLng(lat,lng));
// 		},
// 		setZoom:function(zoom){
// 			if(typeof zoom == 'number'){
// 				this.map.setZoom(zoom);
// 			}
// 		},
// 		getPolyCenter:function(poly){
// 			var lowx,
// 		        highx,
// 		        lowy,
// 		        highy,
// 		        lats = [],
// 		        lngs = [],
// 		        lngs1 = lats1 = 0,
// 		        vertices = poly.getPath(),
// 		    	len = vertices.length,
// 		    	latlng = {},
// 		    	tmplng,tmplat;

// 		    for(var i=0; i<vertices.length; i++) {
// 		    	tmplat = vertices.getAt(i).lat();
// 		    	tmplng = vertices.getAt(i).lng();

// 		      lngs.push(tmplng);
// 		      lats.push(tmplat);
// 		      lngs1 += tmplng;
// 		      lats1 += tmplat;
// 		    }
// 		    function sort(arr){
// 		    	return arr.sort(function(a,b){
// 		    		return a-b;
// 		    	})
// 		    }
// 		    lats = sort(lats);
// 		    lngs = sort(lngs);
		    
// 		    lowx = lats.shift();
// 		    highx = lats.pop();
// 		    lowy = lngs.shift();
// 		    highy = lngs.pop();
// 		    latlng.lat = lowx + ((highx - lowx) / 2);
// 		    latlng.lng = lowy + ((highy - lowy) / 2);
// 		    lowx=highx=lowy=highy=lats=lngs=lngs1=lats1=vertices=len=tmplng=tmplat=null;
// 		    return this.createLatLng(latlng);
// 		},
// 		/*
// 		 *@method 清空地图里的线
// 		 **/
// 		clearLine:function(){
// 			var lines = this.map.lines;
// 			for(var i=0,line;line = lines[i++];){
// 				line.setMap(null);
// 			}
// 			lines = [];
// 		},
//         /*
// 		 *@method 清空地图里的标记
// 		 **/
// 		clearMarker:function(){
// 			for(var i=0,marker;marker = this.map.markers[i++];){
// 				marker.setMap(null);
// 			}
// 			this.map.markers = [];
// 		},	
//         /*
// 		 *@method 清空地图里的标记和线
// 		 **/
// 		empty:function(){
// 			this.clearLine();
// 			this.clearMarker();	
// 		}
// 	}
// 	return GMapUtils;
// })
