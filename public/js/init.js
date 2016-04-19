if (!window.INIT || !window.CONFIG) window.INIT = window.CONFIG = {};
CONFIG = {
	USER: {
		NAME: MDJS.cookie.get('unm')
	}
}
INIT = {
	login: {
		init: function () {
			this.$hUser = $('#hUser');
			this.initUserInfo();
		},
		temp: {
			nologin: [
				'<div class="h-not-login">',
					'<a href="/user/loginPage.do">登录</a>\n',
					'<span>|</span>\n',
					'<a href="/user/registerPage.do">注册</a>',
				'</div>'].join(''),
			login: [
				'<div class="h-login-info">',
					'<img width="40" height="40" alt="麦兜旅行" src="//'+MDJS.server.static+'/img/common/{img}">',
					'<p>',
						'<label id="my_user">{name}</label>',
						'<i class="icon-triangle-down"></i>',
					'</p>',
					'<div class="h-user-list">',
						'<a href="/user/center/order/list.do">我的订单</a>',
						'<a href="/user/center/presell/queryPresellCode.do">我的预约码</a>',
						'<a href="/user/center/coupon/list.do">我的优惠劵</a>',
						'<a href="/user/center/balance/list.do">我的余额</a>',
						'<a href="/user/center/collect/list.do">我的关注</a>',
						'<a href="/user/center/modifyPasswdPage.do">修改密码</a>',
						'<a href="/user/logout.do">退出</a>',
					'</div>',
				'</div>'].join('')
		},
		initUserInfo: function () {
			var _this = this;
			if (MDJS.login.checkUserStatus()) {
				this.$hUser.html(_this.temp.login.substitute({
					name: MDJS.cookie.get('unm'),
					img:  'dft_user.png'
				}));
			} else {
				this.$hUser.html(_this.temp.nologin);
			}
		}
	}
}

INIT.login.init();