// --------------------------------
// MDJS.util.dialog
// --------------------------------
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	// 遮盖层插件 MDJS.util.overlayer
	MDJS.define('MDJS.util.overlayer', {
		id: 'util-overlayer',
		status: false,
		init: function() {
			if (this.container) return;
			$('#'+this.id).remove();
			var style = 'z-index:9000;display:none;width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;';
			this.container = $('<div id="'+this.id+'" style="'+ style +'"></div>');
			$('body').append(this.container);
		},
		// 显示遮盖层
		showLayer: function(op, bg) {
			if (this.status) return false;
			if (!this.container) this.init();
			op = (typeof(op)!='undefined') ? op : 0.5;
			bg = bg || '#000';
			this.container.stop(true,true).css({
				background: bg,
				filter: 'alpha(opacity='+ op*100 +')',
				opacity: op
			});
			this.setSize();
			this.status = true;
		},
		// 关闭遮盖层
		hideLayer: function() {
			if (this.status) {
				if ($.browser.isIE6) {
					this.container.hide();
				} else {
					this.container.fadeOut();
				}
				this.status = false;
			}
		},
		// 设置遮盖层大小
		setSize: function() {
			this.container.css({
				width:   $(document).width()+'px',
				height:  $(document).height()+'px',
				display: 'block'
			});
		},
		// 自适应屏幕调整遮盖层大小
		resize: function() {
			if (this.status) {
				this.container.css('display','none');
				this.setSize();
			}
		}
	}, function() {
		$(window).resize(function() {
			MDJS.util.overlayer.resize();
		});
	});
	// ----------------------------
	var utilId = 'util-dialog';
	var utilText = MDJS.lang.get(utilId) || {
		'close':		'关闭',
		'closeTips':	'关闭浮层',
		'loading':		'正在加载中……',
		'loadingError':	'加载失败',
		'confirm':		'确认',
		'cancel':		'取消',
		'alert':		'提醒',
		'alertTitle':	'消息提示',
		'confirmTitle':	'确认提示',
		'promptTitle':	'输入提示'
	};
	utilText.id = utilId;
	// ----------------------------
	MDJS.define('MDJS.util.dialog', {
		id: utilId,
		status: false,
		resizeStatus: false,
		// 弹窗加载完成时回调方法
		finishCallback: null,
		// 关闭弹出窗时回调方法
		closeCallback: null,
		// 弹窗模板
		tmpls: {
			'frameset': [
				'<div id="{id}">',
					'<div class="pdb-bgt"><span></span></div>',
					'<div class="pdb-bgm"></div>',
					'<div class="pdb-main">',
						'<div class="pdb-title"><h4></h4><span class="close" onclick="MDJS.util.dialog.close();" title="{closeTips}">{close}</span></div>',
						'<div class="pdb-content"><div class="pdb-contentframe"></div></div>',
						'<div class="pdb-bottom"></div>',
					'</div>',
					'<div class="pdb-bgb"><span></span></div>',
				'</div>'
			].join(''),
			'titletab': '<span data-url="{url}" data-width="{width}" data-height="{height}">{title}</span>',
			'bottom':	'<p class="pdb-bottom-action"><a class="btn btn-action"><em>{confirm}</em></a><a class="btn btn-cancel"><em>{cancel}</em></a></p><p class="pdb-bottom-text"></p>',
			'loading':	'<p class="txt-loading-32" style="margin-top:{marginTop}px;">{loadingText}</p>',
			'alert':	'<div class="msg-{type} f14">{message}</div><div class="tac pb20"><a class="btn btn-cancel" onclick="MDJS.util.dialog.close();"><em>{close}</em></a></div>',
			'confirm':	'<div class="msg-confirm f14">{message}</div>',
			'prompt':	'<div class="p20 f14">{content}</div>',
			'inputelm': '<dl class="prompt clearfix"><dt>{title}</dt><dd><input type="text" class="txt-input" /></dd></dl>',
			'iframe':	'<iframe id="{iframeId}" name="{iframeId}" src="about:blank" width="100%" height="{height}px" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"></iframe>',
			'error':	'<div class="p20"><p class="txt-error">{loadingError}</p></div>',
			'ajaxload':	'<p class="txt-loading-32" style="margin-top:{height}px;">&nbsp;</p>'
		},
		// 初始化弹出窗
		init: function() {
			MDJS.ready(function() {
				MDJS.util.dialog._init();
			});
		},
		_init: function() {
			if (this.container) return;
			$('#'+this.id).remove();
			this.container = $(this.tmpls.frameset.substitute(utilText));
			$('body').append(this.container);
		},
		// 打开弹出窗
		open: function(options) {
			MDJS.ready(function() {
				MDJS.util.dialog._open(options);
			});
		},
		_open: function(options) {
			if (this.status && this.lastContentId) {
				$('body').append($('#'+this.lastContentId));
				$('#'+this.lastContentId).hide();
				this.lastContentId = null;
			}
			MDJS.util.overlayer.showLayer(options.op, options.overbg);
			if (!this.container) this._init();
			this.options = options;
			if (options.callback) this.finishCallback = options.callback;
			if (options.closeFunction) this.closeCallback = options.closeFunction;
			if (options.title) {
				this.container.find('.pdb-title').show();
				this.setTitle(options.title, options.tabs);
			} else {
				this.container.find('.pdb-title').hide();
			}
			if (options.bottom) {
				this.container.find('.pdb-bottom').show();
				this.setBottom(options.bottom);
			} else {
				this.container.find('.pdb-bottom').hide();
			}		
			var width = options.width || 400;
			var height = options.height || 300;
			var _this = this;
			switch(options.mode||'text') {
				case 'ajax':
					this.container.find('.pdb-contentframe').html(options.content.loading||this.tmpls.ajaxload.substitute({height:(height-32)/2}));
					this.setAutoHeight();
					$.ajax({
						type:options.content.type||'get',
						url:options.content.url,
						data:options.content.param||'',
						error:function() {
							_this.setContent(options.content.error||_this.tmpls.error.substitute(utilText));
							_this.setAutoHeight(60);
							_this.finish();
						},
						success:function(html) {
							_this.setContent(html);
							_this.setAutoHeight();
						}
					});
					break;
				case 'text':
					this.setContent(options.content);
					break;
				case 'id':
					this.setContent('');
					this.container.find('.pdb-contentframe').append($('#'+options.id));
					$('#'+options.id).removeClass('hidden').show();
					this.lastContentId = options.id;
					break;
				case 'iframe':
					this.iframeId = 'iframe_'+ (new Date()).getTime();
					this.setContent(this.tmpls.iframe.substitute({iframeId:this.iframeId, height:height}));
					this.setIframe(options.url);
					break;
			}
			this.container.find('.pdb-main').css('width', width+'px');
			this.container.find('.pdb-content').css('height', height+'px');
			this.container.css('width', width+20+'px').show();
			var height_2 = height + ((options.title)?this.container.find('.pdb-title').height():0) + ((options.bottom)?45:0);
			this.container.find('.pdb-bgm, .pdb-main').css('height', height_2+'px');
			this.container.attr('class', options.css||'');
			this.status = true;
			this.resizeStatus = true;
			this.resize();
			if (options.mode != 'ajax') this.finish();
		//	MDJS.page.keyHandler.add(document, 'ESC', 'esc-dialog', function() {
		//		MDJS.util.dialog.close();
		//	});
		},
		finish: function() {
			if (this.finishCallback) this.finishCallback(this.container.find('.pdb-contentframe'));
		},
		// 调整弹出窗大小
		resize: function() {
			if (this.status && this.resizeStatus) {
				var _left = ($(window).width() - this.container.width())/2;
				var _top = (this.options.top) ? this.options.top : ($(window).height() - this.container.height())/2;
				this.container.css({
					left: $(document).scrollLeft() + Math.max(_left,20) +'px',
					top: $(document).scrollTop() + Math.max(_top,20) +'px'
				});
				if ($.browser.isIE6) this.container.bindJendUI('HideOverElements', 'select,object');
			}
		},
		// 关闭弹出窗
		close: function(effect) {
			MDJS.ready(function() {
				MDJS.util.dialog._close(effect);
			});
		},
		_close: function(effect) {
			if (!this.status) return;
			if ($.browser.isIE6) effect = '';
			switch(effect) {
				case 'fade':
					this.container.fadeOut();
					break;
				case 'slide':
					this.container.slideUp();
					break;
				default:
					this.container.hide();
			}
			MDJS.util.overlayer.hideLayer();
			this.status = false;
			if (this.lastContentId) {
				$('body').append($('#'+this.lastContentId));
				$('#'+this.lastContentId).hide();
				this.lastContentId = null;
			}
			if ($.browser.isIE6) this.container.bindJendUI('ShowOverElements', 'select,object');
			if (this.closeCallback) {
				setTimeout(function() {
					MDJS.util.dialog.closeCallback();
					MDJS.util.dialog.closeCallback = null;
				},0);
			}
		//	MDJS.page.keyHandler.remove(document, 'esc-dialog');
		},
		setStyle: function(options) {
			MDJS.ready(function() {
				MDJS.util.dialog._setStyle(options);
			});
		},
		_setStyle: function(options) {
			if (options.titlecolor) this.container.find('.pdb-title').css('color', options.titlecolor);
			if (options.bgcolor) this.container.find('.pdb-title').css('background-color', options.bgcolor);
			if (options.bordercolor) this.container.find('.pdb-main').css('border-color', options.bordercolor);			
		},
		// 更换弹出窗标题(新增了tabs的支持)
		setTitle: function(title, tabs) {
			var titleElm = this.container.find('.pdb-title h4');
			if (tabs) {
				titleElm.addClass('tab').html('');
				for (var i=0; i<tabs.length; i++) {
					titleElm.append(this.tmpls.titletab.substitute(tabs[i]));
				}
				titleElm.find('span:first').addClass('on');
				titleElm.find('span').click(function() {
					if ($(this).hasClass('on')) return;
					$(this).siblings('.on').removeClass('on');
					$(this).addClass('on');
					MDJS.util.dialog.setIframe($(this).attr('data-url'));
					MDJS.util.dialog.setWidth(parseInt($(this).attr('data-width'), 10));
					MDJS.util.dialog.setHeight(parseInt($(this).attr('data-height'), 10));
				});
			} else {
				titleElm.removeAttr('class').html(title);
			}
		},
		// 更换弹出窗内容
		setContent: function(html) {
			this.container.find('.pdb-contentframe').html(html);
		},
		// 更换Iframe页内容
		setIframe: function(url) {
			$('#'+this.iframeId).attr('src', url);
		},
		// 更换弹出窗底部内容 { html, noteHtml, actionHtml, actionBtnText, cancelBtnText, callback }
		setBottom: function(options) {
			if (!options) return;
			if (options.html) {
				this.container.find('.pdb-bottom').html(options.html);
			} else {
				this.container.find('.pdb-bottom').html(this.tmpls.bottom.substitute(utilText));
				if (options.noteHtml) this.container.find('.pdb-bottom .pdb-bottom-text').html(options.noteHtml);
				if (options.actionHTML) {
					this.container.find('.pdb-bottom .pdb-bottom-action').html(options.actionHTML);
				} else {
					if (options.actionBtnText) this.container.find('.pdb-bottom .btn-action em').html(options.actionBtnText);
					if (options.cancelBtnText) this.container.find('.pdb-bottom .btn-cancel em').html(options.cancelBtnText);
				}
			}
			if (options.callback) {
				this.container.find('.pdb-bottom .btn-action').click(function() { options.callback(); });
			} else {
				this.container.find('.pdb-bottom .btn-action').click(function() { MDJS.util.dialog.close(); });
			}
			if (options.cancel) {
				this.container.find('.pdb-bottom .btn-cancel').click(function() { options.cancel(); });
			} else {
				this.container.find('.pdb-bottom .btn-cancel').click(function() { MDJS.util.dialog.close(); });
			}
		},
		// 重设弹窗宽度
		setWidth: function(width) {
			if (!width) return;
			width = parseInt(width, 10);
			this.container.find('.pdb-main').css('width', width+'px');
			this.container.css('width', (width+20)+'px');
			this.resize();
		},
		// 重设弹层高度
		setHeight: function(height) {
			if (!height) return;
			height  = parseInt(height, 10);
			var _height = this.container.find('.pdb-content').height();
			var _height2 = this.container.find('.pdb-main').height();
			this.container.find('.pdb-bgm, .pdb-main').css('height', (height-_height+_height2)+'px');
			this.container.find('.pdb-content').css('height', height+'px');
			this.container.find('.pdb-content iframe').attr('height', height);
			this.resize();
		},
		setAutoHeight: function(min) {
			var height = Math.max($('.pdb-contentframe').height(), min||100);
			this.setHeight(height);
		},
		// 显示加载进度
		showLoading: function(params) {
			params.mode = 'text';
			params.height = 100;
			params.marginTop = (params.height - 56) / 2;
			params.loadingText = params.loadingText || utilText.loading;
			params.content = this.tmpls.loading.substitute(params);
			this.open(params);
			return false;
		},
		// 显示弹出窗内容
		show: function(params) {
			params.mode = 'id';
			this.open(params);
			MDJS.ready(function() {
				MDJS.util.dialog.setAutoHeight();
			});
			return false;
		},
		// 打开弹出窗页面
		pop: function(params) {
			params.mode = 'iframe';
			this.open(params);
			return false;
		},
		// 打开Ajax页面
		ajax: function(params) {
			params.mode = 'ajax';
			params.content = { url:params.url };
			this.open(params);
			return false;
		},
		// 打开提醒框
		alert: function(params) {
			if (typeof(params)=='string') {
				params = { message: params };
			}
			params.close = utilText.close;
			params.type = params.type || 'alert';
			var content = this.tmpls.alert.substitute(params);
			this.open({
				mode: 'text', 
				title: params.title || utilText.alertTitle,
				content: content,
				width: params.width || 350,
				height: 100,
				top: params.top,
				closeFunction: params.callback
			});
			MDJS.ready(function() {
				MDJS.util.dialog.setAutoHeight();
			});
			return false;
		},
		// 打开确认框
		confirm: function(params) {
			if (typeof(params)=='string') {
				params = { message: params };
			}
			var content = this.tmpls.confirm.substitute(params);
			var callback = function() {
				MDJS.util.dialog.close();
				if (params.callback && $.isFunction(params.callback)) params.callback();
			};
			var cancel = function() {
				MDJS.util.dialog.close();
				if (params.cancel && $.isFunction(params.cancel)) params.cancel();
			};
			this.open({ 
				mode: 'text', 
				title: params.title || utilText.confirmTitle,
				content: content,
				bottom: {
					callback: callback,
					cancel: cancel
				},
				width: params.width || 350,
				height: 60,
				top: params.top 
			});
			MDJS.ready(function() {
				MDJS.util.dialog.setAutoHeight(60);
			});
			return false;
		},
		// 打开输入框
		prompt: function(params) {
			if (!$.isArray(params.message)) {
				params.message = [params.message];
			}
			var formelement = [];
			for (var i=0; i<params.message.length; i++) {
				formelement.push(this.tmpls.inputelm.substitute({title:params.message[i]}));
			}
			var content = this.tmpls.prompt.substitute({content:formelement.join('')});
			var callback = function() {
				var inputValues = [];
				MDJS.util.dialog.container.find('dl.prompt input').each(function() {
					inputValues.push($(this).val().trim());
				});
				params.callback(inputValues);
				MDJS.util.dialog.close();
			};
			var cancel = function() {
				MDJS.util.dialog.close();
			};
			this.open({ 
				mode: 'text', 
				title: params.title || utilText.promptTitle,
				content: content,
				bottom: {
					callback: callback,
					cancel: cancel
				},
				width: params.width || 350,
				height: 60,
				top: params.top 
			});
			MDJS.ready(function() {
				MDJS.util.dialog.setAutoHeight(60);
			});
			return false;
		}
	}, function() {
		// 自适应调整弹出窗位置
		$(window).resize(function() {
			MDJS.util.dialog.resize();
		});
	});
	// ----------------------------
	MDJS.debug('dialog.js', '初始化成功');
})(jQuery);