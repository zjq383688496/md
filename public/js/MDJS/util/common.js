/* MDJS.ui */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.utilStyles');
	$.extend(MDJS.utilStyles, {
		'float-errortip': 'padding:5px;border:solid 1px #f00;background-color:#ffd;color:#f00;position:absolute;z-index:1000'
	});
	// ----------------------------
	MDJS.namespace('MDJS.ui');
	$.extend(MDJS.ui, {
		// == 显示隐藏 ==========
		// 显示/隐藏被遮盖对象（主要用于IE6中的object/iframe/select在有遮盖层时的显示hack)
		ShowOverElements: function(elm, element) {
			element = (typeof(element) == 'object') ? element.element : element;
			$(element).each(function() {
				if (this._hide) {
					this.style.visibility = 'visible';
					this._hide = false;
				}
			});
		},
		HideOverElements: function(elm, element) {
			element = (typeof(element) == 'object') ? element.element : element;
			var ox = elm.offset().left;
			var oy = elm.offset().top;
			var ow = elm.width();
			var oh = elm.height();
			$(element).each(function() {
				var pos = $(this).offset();
				if (!(ox > (pos.left + $(this).width()) || pos.left > (ox + ow) || pos.top > (oy + oh) || oy > (pos.top + $(this).height()))) {
					this.style.visibility = 'hidden';
					this._hide = true;
				}
			});
			elm.find(element).each(function() {
				this.style.visibility = 'visible';
				this._hide = false;
			});
		},
		// 触发样式：e-elementhover
		ElementHover: function(elm, params) {
			if (elm.data('ElementHover-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.hover(function() {
				var hoverClass = this._param.hoverClass || this._param.className;
				$(this).addClass(hoverClass);
			}, function() {
				var hoverClass = this._param.hoverClass || this._param.className;
				$(this).removeClass(hoverClass);
			});
		},
		// 触发样式：e-childhoverview
		ChildHoverView: function(elm, params) {
			if (elm.data('ChildHoverView-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.hover(function() {
				var hoverChild = this._param.hoverChild || this._param.child;
				$(this).find(hoverChild).show();
			}, function() {
				var hoverChild = this._param.hoverChild || this._param.child;
				$(this).find(hoverChild).hide();
			});
		},
		// 定时关闭(隐藏)div图层
		// 触发样式：e-hidebytimer
		HideByTimer: function(elm, params) {
			elm.each(function() {
				var element = $(this);
				var param = params || element.attrJSON();
				setTimeout(function() {
					if (param.animate == 'slide') {
						element.slideUp();
					} else if (param.animate == 'fade') {
						element.fadeOut();
					} else {
						element.hide();
					}
				}, (param.timer || 3) * 1000);
			});
		},
		// == 内容切换 ==========
		// 简单Tab切换处理
		// 使用一： $('#tab li').bindJendUI('SwitchTabs', { action:'click', child:'#content li' });
		SwitchTabs: function(elm, params) {
			if (elm.data('SwitchTabs-binded')) return;
			params = params || {};
			var tabAction = params.action || 'click';
			var tabClass = params.tabClass || 'on';
			var childClass = params.childClass || 'on';
			var childItems = params.child;
			var callback = params.callback;
			elm.bind(tabAction, function() {
				var element = $(this);
				if (element.hasClass(tabClass)) return;
				element.siblings('.' + tabClass).removeClass(tabClass);
				element.addClass(tabClass);
				var idx = element.attr('data-index') || elm.index(this);
				$(childItems + '.' + childClass).removeClass(childClass);
				$(childItems + ':eq(' + idx + ')').addClass(childClass);
				if (callback) callback($(childItems + ':eq(' + idx + ')'));
				return false;
			});
		},
		// Tab或广告图切换
		ToggleTabItems: function(elm, params) {
			elm.each(function() {
				var element = $(this);
				var param = params || element.attrJSON();
				MDJS.load('base-toggletab', function() {
					new MDJS.base.ToggleTabItems(element, param);
				});
			});
		},
		// 内容滑动效果
		ContentSlide: function(elm, params) {
			elm.each(function() {
				var element = $(this);
				var param = params || element.attrJSON();
				MDJS.load('base-contentslide', function() {
					new MDJS.base.ContentSlide(element, param);
				});
			});
		},
		// == 输入处理 ==========
		// 输入限制： 只能输入整数或小数
		// 使用一： $('input').bindJendUI('InputLimit', { limitType:'integer' });
		// 触发样式：e-inputlimit
		InputLimit: function(elm, params) {
			if (elm.data('InputLimit-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.css('ime-mode', 'disabled');
			elm.bind('keypress', function(e) {
				try {
					if (e.shiftKey) return false;
					var code = e.which || e.keyCode || 0;
					if (this._param.limitType == 'float') {
						return code == 8 || (e.which === 0 && e.keyCode == 37) || (e.which === 0 && e.keyCode == 39) || (code >= 48 && code <= 57) || code == 46;
					} else {
						return code == 8 || (e.which === 0 && e.keyCode == 37) || (e.which === 0 && e.keyCode == 39) || (code >= 48 && code <= 57) || (e.which === 0 && e.keyCode == 46);
					}
					// 8:backspace / 37:left / 39:right / 46:del (FF: del为which=0,keyCode=46)
				} catch (err) {}
			});
			elm.bind('paste', function() {
				return !clipboardData.getData('text').match(/\D/);
			});
			elm.bind('dragenter', function() {
				return false;
			});
		},
		NumeralInput: function(elm, params) {
			elm.each(function() {
				var param = params || $(this).attrJSON();
				if (param.allowFloat) param.limitType = 'float';
				$(this).bindJendUI('InputLimit', param);
			});
		},
		// 显示输入框默认文本
		// 使用一： $('input').bindJendUI('InputHint', { hint:'默认文本', required:true, hintKeep:false, hintClass:'', hintColor:'' });
		// 触发样式：e-inputhint
		InputHint: function(elm, params) {
			if (elm.data('InputHint-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.each(function() {
				var domElm = this;
				if (!this.form) return;
				$(this.form).submit(function(e) {
					if (domElm._param.hintKeep && domElm._param.hintKeep != 'false') return true;
					if ($.trim(domElm.value) === '' || $.trim(domElm.value) == domElm._param.hint) {
						if (domElm._param.required) {
							domElm.focus();
							if (e.preventDefault) e.preventDefault();
							return false;
						} else {
							domElm.value = '';
							return true;
						}
					}
				});
			});
			elm.bind('focus', function() {
				if (this._param.hintColor) $(this).css('color', '');
				if (this._param.hintClass) $(this).removeClass(this._param.hintClass);
				if ($.trim(this.value) == this._param.hint) $(this).val('');
			});
			elm.bind('blur', function() {
				if ($.trim(this.value) === '' || $.trim(this.value) == this._param.hint) {
					if (this._param.hintColor) $(this).css('color', this._param.hintColor);
					if (this._param.hintClass) $(this).addClass(this._param.hintClass);
					this.value = this._param.hint;
				}
			});
			elm.blur();
		},
		InputDefault: function(elm, params) {
			elm.each(function() {
				var param = params || $(this).attrJSON();
				if (param.value) param.hint = param.value;
				if ((param.allowempty || 'no') == 'no') param.required = true;
				if ((param.keepdef || 'no') != 'no') param.hintKeep = true;
				if (param.color) param.hintColor = param.color;
				if (param.className) param.hintClass = param.className;
				$(this).bindJendUI('InputHint', param);
			});
		},
		InputBGHint: function(elm, hintClass) {
			if (elm.data('InputBGHint-binded')) return;
			elm.each(function() {
				if (this.value === '') $(this).addClass(hintClass);
			});
			elm.focus(function() {
				$(this).removeClass(hintClass);
			});
			elm.blur(function() {
				if (this.value === '') $(this).addClass(hintClass);
			});
		},
		// placeholder处理，用于不支持placeholder属性时的JS替代解决。
		InputPlaceHolder: function(elm, param) {
			if (!($.browser.msie && $.browser.version < 10)) return;
			if (elm.data('InputPlaceHolder-binded')) return;
			param = param || {};
			elm.each(function() {
				var text = $(this).attr("placeholder");
				var cssdata = {
					'position': 'absolute',
					'padding-left': '5px',
					'line-height': ($(this).outerHeight() || 20) + 'px',
					'width': (($(this).width() > 0) ? ($(this).width() + 'px') : 'auto'),
					'color': param.color || '#999'
				};
				if ($(this).val() !== '') cssdata.display = 'none';
				var mask = $('<div>').html(text).css(cssdata);
				$(this).after(mask);
				// 点击时隐藏
				mask.click(function() {
					$(this).prev().focus();
					$(this).hide();
				});
				mask.bind('resetPosition', function() {
					var pos = $(this).prev().position();
					$(this).css({
						'top': pos.top,
						'left': pos.left
					});
				});
				mask.trigger('resetPosition');
				// 用于非focus时，值被改动后的处理
				this.onpropertychange = function() {
					if (this.value !== '' && !this.isFocus) {
						$(this).next().hide();
					}
				};
			});
			elm.focus(function() {
				this.isFocus = true;
				$(this).next().hide();
			});
			elm.blur(function() {
				this.isFocus = false;
				if (this.value === '') $(this).next().show().trigger('resetPosition');
			});
		},
		// 最少输入字数限制提示处理 params: { minlen, tips, pos, css, timer }
		// 触发样式： e-inputminlen
		InputMinLength: function(elm, params) {
			if (elm.data('InputMinLength-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.bind('blur', function() {
				if (!this._param.minlen) return;
				var minlen = parseInt(this._param.minlen, 10);
				if (this.value.trim().getByteLength() < minlen) {
					$(this).bindJendUI('FloatErrorTipText', this._param);
				}
			});
		},
		// 最多输入字数限制提示处理 params: { maxlen, tips, pos, css, timer }
		// 触发样式： e-inputmaxlen
		InputMaxLength: function(elm, params) {
			if (elm.data('InputMaxLength-binded')) return;
			MDJS.ui.bindElementParam(elm, params);
			elm.bind('keyup', function() {
				if (!this._param.maxlen) return;
				var maxlen = parseInt(this._param.maxlen, 10);
				if (this.value.trim().getByteLength() > maxlen) {
					this.value = this.value.trim().subByte(maxlen, '');
					$(this).bindJendUI('FloatErrorTipText', this._param);
				} else if (this.value.trim().getByteLength() <= maxlen - 2) {
					if ($(this).data('floaterrortip')) {
						$(this).data('floaterrortip').remove();
						$(this).data('floaterrortip', '');
					}
				}
			});
		},
		// 浮动Tips文字显示处理（会自动隐藏） params: { tips, pos, css, timer }
		FloatErrorTipText: function(elm, params) {
			if (!params || !params.tips) return;
			if (elm.data('floaterrortip')) return;
			var tipElm = $('<div style="' + MDJS.utilStyles['float-errortip'] + '">' + params.tips + '</div>');
			$('body').append(tipElm);
			if (params.pos && params.pos == 'right') {
				tipElm.css({
					'width': '200px',
					'left': (elm.offset().left + elm.outerWidth() + 5) + 'px',
					'top': (elm.offset().top) + 'px'
				});
			} else {
				tipElm.css({
					'width': (elm.outerWidth() - 12) + 'px',
					'left': (elm.offset().left) + 'px',
					'top': (elm.offset().top + elm.outerHeight() + 1) + 'px'
				});
			}
			if (params.css) tipElm.css(params.css);
			elm.data('floaterrortip', tipElm);
			setTimeout(function() {
				if (elm.data('floaterrortip')) {
					elm.data('floaterrortip').slideUp(function() {
						if (elm.data('floaterrortip')) {
							elm.data('floaterrortip').remove();
							elm.data('floaterrortip', '');
						}
					});
				}
			}, (params.timer || 1) * 1000);
		},
		// == 内容加载 ==========
		// Delayload，内容滚动延迟加载。
		// 使用： $(document).bindJendUI('DelayLoad', { eventClass:'e-delayload', callback:function() {} });
		DelayLoad: function(elm, params) {
			params = params || {};
			var eventClass = params.eventClass || 'e-delayload';
			var delayLoad = function() {
				var elms = $('.' + eventClass);
				if (elms.length === 0) {
					$(window).unbind('scroll', delayLoad);
					$(window).unbind('resize', delayLoad);
				} else {
					var preloadHeight = params.preloadHeight || 0;
					elms.each(function() {
						var element = $(this);
						if (element.offset().top > $(window).height() + $(document).scrollTop() + preloadHeight) return;
						params.callback(element);
						element.removeClass(eventClass);
					});
				}
			};
			$(window).bind('scroll', delayLoad);
			$(window).bind('resize', delayLoad);
			delayLoad();
		},
		// Ajax内容滚动延迟加载处理
		// 使用： $(document).bindJendUI('AjaxDelayLoad');
		AjaxDelayLoad: function(elm, params) {
			params = params || {};
			elm.bindJendUI('DelayLoad', {
				preloadHeight: params.preloadHeight || 100,
				eventClass: params.eventClass || 'e-ajaxload',
				callback: function(element) {
					element.load(element.attr('data-url'), function() {
						element.bindJendUI('ModuleLoaded');
						if (params.callback) params.callback(element);
					});
				}
			});
		},
		// 图片内容滚动延迟加载处理
		// 使用： $(document).bindJendUI('ImageDelayLoad');
		ImageDelayLoad: function(elm, params) {
			params = params || {
				preloadHeight: 100,
				eventClass: 'e-imageload'
			};
			var eventClass = params.eventClass || 'e-imageload';
			var imageDelayLoad = function() {
				var elms = $('.' + eventClass);
				if (elms.length === 0) {
					$(window).unbind('scroll', imageDelayLoad);
					$(window).unbind('resize', imageDelayLoad);
				} else {
					elms.bindJendUI('DelayLoadImage', params);
				}
			};
			$(window).bind('scroll', imageDelayLoad);
			$(window).bind('resize', imageDelayLoad);
			imageDelayLoad();
		},
		AddImageDelayLoad: function(elm) {
			if ($('.e-imageload').length === 0) {
				elm.addClass('e-imageload');
				elm.bindJendUI('ImageDelayLoad');
			} else {
				if (elm.parents('.e-imageload').length === 0 && !elm.hasClass('e-imageload')) {
					elm.addClass('e-imageload');
				}
				elm.bindJendUI('DelayLoadImage', {
					preloadHeight: 100
				});
			}
		},
		// 图片延迟加载处理
		DelayLoadImage: function(elm, params) {
			params = params || {};
			var eventClass = params.eventClass || 'e-imageload';
			var preloadHeight = params.preloadHeight || 0;
			elm.each(function() {
				var element = $(this);
				if (!element.hasClass(eventClass)) return;
				if (element.offset().top > $(window).height() + $(document).scrollTop() + preloadHeight) return;
				element.find('img[realSrc]').each(function() {
					if ($(this).offset().top < $(window).height() + $(document).scrollTop() + preloadHeight) {
						$(this).bindJendUI('LoadRealImage', {
							srcAttr: 'realSrc'
						});
					}
				});
				element.find('img[original]').each(function() {
					if ($(this).offset().top < $(window).height() + $(document).scrollTop() + preloadHeight) {
						$(this).bindJendUI('LoadRealImage', {
							srcAttr: 'original'
						});
					}
				});
				if (element.find('img[realSrc], img[original]').length === 0) {
					element.removeClass(eventClass);
				}
			});
		},
		// 加载容器中的图片内容, eventClass最好固定用e-childload
		LoadChildImage: function(elm, params) {
			params = params || {};
			var eventClass = params.eventClass || 'e-childload';
			elm.each(function() {
				var element = $(this);
				if (!element.hasClass(eventClass)) return;
				element.removeClass(eventClass);
				element.find('img[realSrc]').each(function() {
					$(this).bindJendUI('LoadRealImage', {
						srcAttr: 'realSrc'
					});
				});
				element.find('img[original]').each(function() {
					$(this).bindJendUI('LoadRealImage', {
						srcAttr: 'original'
					});
				});
			});
		},
		// 图片加载
		LoadRealImage: function(elm, params) {
			elm.each(function() {
				var element = $(this);
				var param = params || element.attrJSON();
				var realSrc = element.attr(param.srcAttr || 'realSrc') || '';
				var errorSrc = param.errorUrl || 'http://i0.ule.com/i/global/noimage_140.jpg';
				if (realSrc) {
					if (param.autoScale || param.autoMargin || param.autoPadding) {
						var oW = element.attr('width') || element.width() || param.width || 80;
						var oH = element.attr('height') || element.height() || param.height || 80;
						new MDJS.base.ImageLoader({
							src: realSrc,
							onLoad: function() {
								element.removeAttr(param.srcAttr || 'realSrc');
								element.attr('src', this.element.src);
								var w = this.element.width;
								var h = this.element.height;
								if (w && h) {
									var _w = 0;
									var _h = 0;
									if (w / h >= oW / oH) {
										_w = oW;
										_h = (h * oW) / w;
										if (w < oW && param.autoScale) {
											_w = w;
											_h = h;
										}
									} else {
										_w = (w * oH) / h;
										_h = oH;
										if (h < oH && param.autoScale) {
											_w = w;
											_h = h;
										}
									}
									var m_w = parseInt((oW - _w) / 2, 10);
									var m_h = parseInt((oH - _h) / 2, 10);
									element.css({
										width: _w + 'px',
										height: _h + 'px'
									});
									if (param.autoMargin) element.css({
										marginTop: m_h,
										marginLeft: m_w
									});
									if (param.autoPadding) element.css('padding', m_h + 'px ' + m_w + 'px');
								}
							},
							onError: function() {
								element.attr('src', errorSrc);
							}
						});
					} else {
						if (element.hasClass('e-pngfix') && $.browser.isIE6) {
							element.bindJendUI('FixIE6PNG', {
								srcAttr: (param.srcAttr || 'realSrc')
							});
							element.removeAttr(param.srcAttr || 'realSrc');
						} else {
							element.attr('src', realSrc);
							element.removeAttr(param.srcAttr || 'realSrc');
						}
						MDJS.debug('load image', realSrc);
					}
				}
			});
		},
		// 用于IE6下修复png透明问题
		FixIE6PNG: function(elm, params) {
			if (!$.browser.isIE6) return;
			params = params || {};
			elm.each(function() {
				var element = $(this);
				var blankSrc = 'http://i0.ule.com/i/global/1px.gif',
					realSrc = element.attr(params.srcAttr || 'src') || '',
					width = (params.width || element.attr('width') || element.width()),
					height = (params.height || element.attr('height') || element.height());
				element.attr('src', blankSrc);
				element.attr('style', "background:transparent;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + realSrc + "',sizingMethod='scale');");
				element.css({
					width: width + 'px',
					height: height + 'px'
				});
			});
		},
		// 滚动加载处理
		// param: { url, page, preheight, lastClass, afterLoad }
		LoadDataByScroll: function(elm, param) {
			if (elm.data('LoadDataByScroll-binded')) return;
			param = param || {};
			param.lastClass = param.lastClass || 'lastitem';
			if (param.url) elm.attr('data-url', param.url);
			if (param.page) elm.attr('data-page', param.page);
			if (param.preheight) elm.attr('data-preheight', param.preheight);
			elm.data('scrollingStatus', (elm.children('.' + param.lastClass).length === 0));
			elm.bind('ContentLoad', function() {
				var that = $(this);
				that.data('scrollingStatus', false);
				var page = parseInt(that.attr('data-page') || 1, 10);
				var url = that.attr('data-url').format(page);
				var childSize = that.children().length;
				$.get(url, function(d) {
					if (page == 1) that.html('');
					that.append(d);
					var newItems = that.children(':gt(' + (childSize - 1) + ')');
					if (param.afterLoad) param.afterLoad(newItems);
					if (that.children('.' + param.lastClass).length === 0) {
						that.attr('data-page', page + 1);
						that.data('scrollingStatus', true);
					} else {
						that.data('scrollingStatus', false);
					}
				});
			});
			elm.bind('ContentScroll', function() {
				var that = $(this);
				if (!that.data('scrollingStatus') || that.children().length === 0) return;
				var preheight = that.attr('data-preheight') || that.children(':first').outerHeight();
				if ($(window).height() + $(document).scrollTop() > that.offset().top + that.outerHeight() - preheight) {
					that.trigger('ContentLoad');
				}
			});
			$(window).scroll(function() {
				elm.trigger('ContentScroll');
			});
			$(document).ready(function() {
				elm.trigger('ContentScroll');
			});
		},
		// == 其他处理 ==========
		// 空白区点击事件绑定
		OuterClickEvent: function(elm, callback) {
			var cancelBubble = function(e) {
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			};
			var elmEvent = function() {
				callback();
				elm.unbind('click', cancelBubble);
				$(document).unbind('click', elmEvent);
			};
			elm.bind('click', cancelBubble);
			$(document).bind('click', elmEvent);
		},
		// 倒计时处理, param: { secAttr, callback }
		CountDown: function(elm, param) {
			if (elm.data('CountDown-binded')) return;
			var setCountDownStr = function(element, seconds) {
				if (seconds < 0) return;
				var s = seconds % 60,
					m = Math.floor((seconds % 3600) / 60),
					h = Math.floor(seconds / 3600),
					d = 0;
				if (element.find('.tcd-d').length > 0) {
					h = Math.floor((seconds % 86400) / 3600);
					d = Math.floor(seconds / 86400);
				}
				element.find('.tcd-d').html(d);
				element.find('.tcd-h').html(h.padLeft(element.data('hlen'), '0'));
				element.find('.tcd-m').html(m.padLeft(element.data('mlen'), '0'));
				element.find('.tcd-s').html(s.padLeft(element.data('slen'), '0'));
			};
			var params = param || elm.attrJSON();
			params.endAttr = params.endAttr || 'data-end';
			params.nowTime = params.nowTime || new Date().getTime();
			params.secAttr = params.secAttr || 'millseconds';
			params.secCount = params.secCount || 1;
			elm.each(function() {
				var element = $(this);
				element.data('hlen', element.find('.tcd-h').text().length || 2);
				element.data('mlen', element.find('.tcd-m').text().length || 2);
				element.data('slen', element.find('.tcd-s').text().length || 2);
				//
				var millseconds, seconds;
				if (element.attr(params.endAttr)) {
					millseconds = element.attr(params.endAttr).parseDate().getTime() - params.nowTime;
					seconds = Math.round(millseconds / 1000);
				} else {
					millseconds = parseInt(element.attr(params.secAttr) || 0, 10);
					seconds = Math.round(millseconds / 1000);
					if (MDJS.timestat && MDJS.timestat.loadTime) {
						seconds = Math.round((millseconds - new Date().getTime() + MDJS.timestat.loadTime) / 1000);
					}
				}
				var timer = setInterval(function() {
					seconds = seconds - params.secCount;
					setCountDownStr(element, seconds);
					if (seconds <= 0) {
						clearInterval(timer);
						if (params.callback) params.callback(element);
					}
				}, params.secCount * 1000);
				setCountDownStr(element, seconds);
			});
		},
		// updateLinkSrcId
		updateLinkSrcId: function(elm) {
			elm.each(function() {
				var element = $(this);
				element.find('a[href],area[href]').bind("mousedown", function() {
					var srcid = element.attr('srcid') || '';
					var srcidx = element.attr('srcidx') || 1;
					var srctype = element.attr('srctype') || 'child';
					if (srcid === '') return;
					if (srcid.right(4) == '{d3}') {
						if (srctype == 'child') {
							element.children().each(function() {
								var child = $(this);
								var tag = child.tagName();
								var childlinks = (tag == 'a' || tag == 'area') ? child.filter('[href]') : child.find('a[href], area[href]');
								if (childlinks.length === 0) return;
								childlinks.bindJendUI('updateLinkElmSrcID', srcid.replace('{d3}', srcidx.padLeft(3, '0')));
								srcidx++;
							});
						} else {
							element.find('a[href],area[href]').each(function() {
								$(this).bindJendUI('updateLinkElmSrcID', srcid.replace('{d3}', srcidx.padLeft(3, '0')));
								srcidx++;
							});
						}
					} else {
						element.find('a[href], area[href]').bindJendUI('updateLinkElmSrcID', srcid);
					}
					element.removeClass('e-loadsrcid');
					element.removeAttr('srcid');
					element.removeAttr('srcidx');
					element.removeAttr('srctype');
				});

			});
		},
		updateLinkElmSrcID: function(elm, srcid) {
			// 初始化pageurl
			var pageurl = document.location.href;
			if (pageurl.indexOf('#') >= 0) {
				pageurl = pageurl.sliceBefore('#');
			}
			elm.each(function() {
				var _srcid = this.getAttribute('srcid') || '';
				if (_srcid == 'no') {
					return;
				} else if (_srcid !== '') {
					srcid = _srcid;
				}
				var url = this.getAttribute('href').trim(),
					hash = '';
				if (url.startWith('#') || url.toLowerCase().startWith('javascript')) {
					return;
				}
				if (url.indexOf('#') > 0) {
					hash = '#' + url.sliceAfter('#');
					url = url.sliceBefore('#');
					if (url == pageurl) {
						return false;
					}
				}
				if (url.indexOf('?') >= 0 && url.indexOf('srcid=') > 0) {
					url = url.replace('srcid=' + url.getQueryValue('srcid'), 'srcid=' + srcid);
				} else {
					url += ((url.indexOf('?') > 0) ? '&' : '?') + 'srcid=' + srcid;
				}
				this.setAttribute('href', url + hash);
			});
		},
		// format/type/minDate/maxDate/callback
		DatePicker: function(elm, params) {
			MDJS.load('lhgcalendar', function() {
				elm.each(function() {
					var options = params || $(this).attrJSON();
					if (!options.format) {
						options.format = (options.type == 'time') ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
					}
					if (options.callback) {
						options.onSetDate = function() {
							var datestr = this.getDateStr('date');
							setTimeout(function() {
								options.callback(datestr);
							}, 50);
						}
					}
					$(this).calendar(options);
				});
			});
		}
	});
	// ----------------------------
	MDJS.debug('jend.ui.js', '初始化成功');
})(jQuery);