// ==================================================
// ==== MDJS v1.0.0.0 ====
// 基于jQuery v2.2.1，包括以下方法集合：
// - JS原型方法扩展： String/Number/Array/Date
// - jQuery方法扩展: $.browser/$.fn
// - MDJS旧版保留方法: flash/DOM/DSS/cookie
// - MDJS方法库： core/json/base/page/login
// ==================================================
/* String 原型方法扩展 */
(function($) {
	if (!$) return;
	$.extend(String.prototype, {
		_toBoolean: function() {
			return (this.toString() === 'false' || this.toString() === '' || this.toString() === '0') ? false: true;
		},
		_toNumber: function() {
			return (!isNaN(this)) ? Number(this) : this.toString();
		},
		_toRealValue: function() {
			return (this.toString() === 'true' || this.toString() === 'false') ? this._toBoolean() : this._toNumber();
		},
		trim: function() {
			return this.replace(/(^\s*)|(\s*$)/g, '');
		},
		ltrim: function() {
			return this.replace(/(^\s*)/g, '');
		},
		rtrim: function() {
			return this.replace(/(\s*$)/g, '');
		},
		trimAll: function() {
			return this.replace(/\s/g, '');
		},
		trimNoteChar: function() {
			return this.replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, '').trim();
		},
		left: function(len) {
			return this.substring(0, len);
		},
		right: function(len) {
			return (this.length <= len) ? this.toString() : this.substring(this.length - len, this.length);
		},
		reverse: function() {
			return this.split('').reverse().join('');
		},
		startWith: function(start, noCase) {
			return !(noCase ? this.toLowerCase().indexOf(start.toLowerCase()) : this.indexOf(start));
		},
		endWith: function(end, noCase) {
			return noCase ? (new RegExp(end.toLowerCase() + '$').test(this.toLowerCase().trim())) : (new RegExp(end + '$').test(this.trim()));
		},
		sliceAfter: function(str) {
			return (this.indexOf(str) >= 0) ? this.substring(this.indexOf(str) + str.length, this.length) : '';
		},
		sliceBefore: function(str) {
			return (this.indexOf(str) >= 0) ? this.substring(0, this.indexOf(str)) : '';
		},
		getByteLength: function() {
			return this.replace(/[^\x00-\xff]/ig, 'xx').length;
		},
		subByte: function(len, s) {
			if (len < 0 || this.getByteLength() <= len) {
				return this.toString();
			}
			var str = this;
			str = str.substr(0, len).replace(/([^\x00-\xff])/g,'\x241 ').substr(0, len).replace(/[^\x00-\xff]$/,'').replace(/([^\x00-\xff]) /g,'\x241');
			return str + (s || '');
		},
		encodeURI: function(type) {
			var etype = type || 'utf',
				efn = (etype == 'uni') ? escape: encodeURIComponent;
			return efn(this);
		},
		decodeURI: function(type) {
			var dtype = type || 'utf',
				dfn = (dtype == 'uni') ? unescape: decodeURIComponent;
			try {
				var os = this.toString(),
					ns = dfn(os);
				while (os != ns) {
					os = ns;
					ns = dfn(os);
				}
				return os;
			} catch(e) {
				// 备注： uni加密，再用utf解密的时候，会报错
				return this.toString();
			}
		},
		textToHtml: function() {
			return this.replace(/</ig, '&lt;').replace(/>/ig, '&gt;').replace(/\r\n/ig, '<br>').replace(/\n/ig, '<br>');
		},
		htmlToText: function() {
			return this.replace(/<br>/ig, '\r\n');
		},
		htmlEncode: function() {
			var text = this,
				re = {
					'<': '&lt;',
					'>': '&gt;',
					'&': '&amp;',
					'"': '&quot;'
				};
			for (var i in re) {
				text = text.replace(new RegExp(i, 'g'), re[i]);
			}
			return text;
		},
		htmlDecode: function() {
			var text = this,
				re = {
					'&lt;': '<',
					'&gt;': '>',
					'&amp;': '&',
					'&quot;': '"'
				};
			for (var i in re) {
				text = text.replace(new RegExp(i, 'g'), re[i]);
			}
			return text;
		},
		stripHtml: function() {
			return this.replace(/(<\/?[^>\/]*)\/?>/ig, '');
		},
		stripScript: function() {
			return this.replace(/<script(.|\n)*\/script>\s*/ig, '').replace(/on[a-z]*?\s*?=".*?"/ig, '');
		},
		replaceAll: function(os, ns) {
			return this.replace(new RegExp(os, 'gm'), ns);
		},
		escapeReg: function() {
			return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
		},
		addQueryValue: function(name, value) {
			var url = this.getPathName();
			var param = this.getQueryJson();
			if (!param[name]) param[name] = value;
			return url + '?' + $.param(param);
		},
		getQueryValue: function(name) {
			var reg = new RegExp("(^|&|\\?|#)" + name.escapeReg() + "=([^&]*)(&|\x24)", "");
			var match = this.match(reg);
			return (match) ? match[2] : '';
		},
		getQueryJson: function() {
			if (this.indexOf('?') < 0) return {};
			var query = this.substr(this.indexOf('?') + 1),
				params = query.split('&'),
				len = params.length,
				result = {},
				key,
				value,
				item,
				param;
			for (var i = 0; i < len; i++) {
				param = params[i].split('=');
				key = param[0];
				value = param[1];
				item = result[key];
				if ('undefined' == typeof item) {
					result[key] = value;
				} else if (Object.prototype.toString.call(item) == '[object Array]') {
					item.push(value);
				} else {
					result[key] = [item, value];
				}
			}
			return result;
		},
		getDomain: function() {
			if (this.startWith('http://')) return this.split('/')[2];
			return '';
		},
		getPathName: function() {
			return (this.lastIndexOf('?') == -1) ? this.toString() : this.substring(0, this.lastIndexOf('?'));
		},
		getFilePath: function() {
			return this.substring(0, this.lastIndexOf('/') + 1);
		},
		getFileName: function() {
			return this.substring(this.lastIndexOf('/') + 1);
		},
		getFileExt: function() {
			return this.substring(this.lastIndexOf('.') + 1);
		},
		parseDate: function() {
			return (new Date()).parse(this.toString());
		},
		parseJSON: function() {
			return (new Function("return " + this.toString()))();
		},
		parseAttrJSON: function() {
			var d = {},
				a = this.toString().split(';');
			for (var i = 0; i < a.length; i++) {
				if (a[i].trim() === '' || a[i].indexOf(':') < 1) continue;
				var item = a[i].sliceBefore(':').trim(),
					val = a[i].sliceAfter(':').trim();
				if (item !== '' && val !== '') d[item.toCamelCase()] = val._toRealValue();
			}
			return d;
		},
		_pad: function(width, ch, side) {
			var str = [side ? '': this, side ? this: ''];
			while (str[side].length < (width ? width: 0) && (str[side] = str[1] + (ch || ' ') + str[0]));
			return str[side];
		},
		padLeft: function(width, ch) {
			if (this.length >= width) return this.toString();
			return this._pad(width, ch, 0);
		},
		padRight: function(width, ch) {
			if (this.length >= width) return this.toString();
			return this._pad(width, ch, 1);
		},
		toHalfWidth: function() {
			return this.replace(/[\uFF01-\uFF5E]/g, function(c) {
				return String.fromCharCode(c.charCodeAt(0) - 65248);
			}).replace(/\u3000/g, " ");
		},
		toCamelCase: function() {
			if (this.indexOf('-') < 0 && this.indexOf('_') < 0) {
				return this.toString();
			}
			return this.replace(/[-_][^-_]/g, function(match) {
				return match.charAt(1).toUpperCase();
			});
		},
		format: function() {
			var result = this;
			if (arguments.length > 0) {
				var parameters = (arguments.length == 1 && $.isArray(arguments[0])) ? arguments[0] : $.makeArray(arguments);
				$.each(parameters, function(i, n) {
					result = result.replace(new RegExp("\\{" + i + "\\}", "g"), n);
				});
			}
			return result;
		},
		substitute: function(data) {
			if (data && typeof(data) == 'object') {
				return this.replace(/\{([^{}]+)\}/g, function(match, key) {
					var value = data[key];
					return (value !== undefined) ? '' + value: '';
				});
			} else {
				return this.toString();
			}
		},
		// 将ID串转化为EAN-13
		toEAN13: function(pre) {
			var len = 12 - pre.length;
			var str = pre + ((this.length >= len) ? this.left(len) : this.padLeft(len, '0'));
			var a = 0,
				b = 0,
				c = 0,
				d = str.reverse();
			for (var i = 0; i < d.length; i++) {
				if (i % 2) {
					b += parseInt(d.charAt(i), 10);
				} else {
					a += parseInt(d.charAt(i), 10);
				}
			}
			if ((a * 3 + b) % 10) {
				c = 10 - (a * 3 + b) % 10;
			}
			return str + c;
		},
		toMapObject: function(sep) {
			sep = sep || '/';
			var s = this.split(sep);
			var d = {};
			var o = function(a, b, c) {
				if (c < b.length) {
					if (!a[b[c]]) {
						a[b[c]] = {};
					}
					d = a[b[c]];
					o(a[b[c]], b, c + 1);
				}
			};
			o(window, s, 1);
			return d;
		}
	});
})(jQuery);

/* String 数据校验相关 */
(function($) {
	if (!$) return;
	$.extend(String.prototype, {
		isIP: function() {
			var re = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
			return re.test(this.trim());
		},
		isUrl: function() {
			return (new RegExp(/^(ftp|https?):\/\/([^\s\.]+\.[^\s]{2,}|localhost)$/i).test(this.trim()));
		},
		isURL: function() {
			return this.isUrl();
		},
		isDate: function() {
			var result = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (result === null) return false;
			var d = new Date(result[1], result[3] - 1, result[4]);
			return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4]);
		},
		isTime: function() {
			var result = this.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
			if (result === null) return false;
			if (result[1] > 24 || result[3] > 60 || result[4] > 60) return false;
			return true;
		},
		isDateTime: function() {
			var result = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
			if (result === null) return false;
			var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
			return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]);
		},
		// 整数
		isInteger: function() {
			return (new RegExp(/^(-|\+)?\d+$/).test(this.trim()));
		},
		// 正整数
		isPositiveInteger: function() {
			return (new RegExp(/^\d+$/).test(this.trim())) && parseInt(this, 10) > 0;
		},
		// 负整数
		isNegativeInteger: function() {
			return (new RegExp(/^-\d+$/).test(this.trim()));
		},
		isNumber: function() {
			return !isNaN(this);
		},
		isRealName: function() {
			return (new RegExp(/^[A-Za-z \u4E00-\u9FA5]+$/).test(this));
		},
		isLogName: function() {
			return (this.isEmail() || this.isMobile());
		},
		isEmail: function() {
			return (new RegExp(/^([_a-zA-Z\d\-\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/).test(this.trim()));
		},
		isMobile: function() {
			return (new RegExp(/^(13|14|15|17|18)\d{9}$/).test(this.trim()));
		},
		isPhone: function() {
			return (new RegExp(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/).test(this.trim()));
		},
		isAreacode: function() {
			return (new RegExp(/^0\d{2,3}$/).test(this.trim()));
		},
		isPostcode: function() {
			return (new RegExp(/^\d{6}$/).test(this.trim()));
		},
		isLetters: function() {
			return (new RegExp(/^[A-Za-z]+$/).test(this.trim()));
		},
		isDigits: function() {
			return (new RegExp(/^[1-9][0-9]+$/).test(this.trim()));
		},
		isAlphanumeric: function() {
			return (new RegExp(/^[a-zA-Z0-9]+$/).test(this.trim()));
		},
		isValidString: function() {
			return (new RegExp(/^[a-zA-Z0-9\s.\-_]+$/).test(this.trim()));
		},
		isLowerCase: function() {
			return (new RegExp(/^[a-z]+$/).test(this.trim()));
		},
		isUpperCase: function() {
			return (new RegExp(/^[A-Z]+$/).test(this.trim()));
		},
		isChinese: function() {
			return (new RegExp(/^[\u4e00-\u9fa5]+$/).test(this.trim()));
		},
		isIDCard: function() {
			//这里没有验证有效性，只验证了格式
			var r15 = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);
			var r18 = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/);
			return (r15.test(this.trim()) || r18.test(this.trim()));
		},
		// 卡号校验 模10检查
		isCardNo: function(cardType) {
			var cards = {
				'Visa': {
					lengths: '13,16',
					prefixes: '4',
					checkdigit: true
				},
				'MasterCard': {
					lengths: '16',
					prefixes: '51,52,53,54,55',
					checkdigit: true
				},
				'BankCard': {
					lengths: '16,17,19',
					prefixes: '3,4,5,6,9',
					checkdigit: false
				}
			};
			if (!cards[cardType]) return false;
			// remove spaces and dashes
			var cardNo = this.replace(/[\s-]/g, '');
			var cardexp = /^[0-9]{13,19}$/;
			if (cardNo.length === 0 || !cardexp.exec(cardNo)) {
				return false;
			} else {
				// strip down to digits
				cardNo = cardNo.replace(/\D/g, '');
				var modTenValid = true;
				var prefixValid = false;
				var lengthValid = false;
				// 模10检查
				if (cards[cardType].checkdigit) {
					var checksum = 0,
						j = 1,
						calc;
					for (i = cardNo.length - 1; i >= 0; i--) {
						calc = Number(cardNo.charAt(i)) * j;
						if (calc > 9) {
							checksum = checksum + 1;
							calc = calc - 10;
						}
						checksum = checksum + calc;
						if (j == 1) {
							j = 2;
						} else {
							j = 1;
						}
					}
					if (checksum % 10 !== 0) modTenValid = false;
				}
				if (cards[cardType].prefixes === '') {
					prefixValid = true;
				} else {
					// 前缀字符检查
					var prefix = cards[cardType].prefixes.split(',');
					for (i = 0; i < prefix.length; i++) {
						var exp = new RegExp("^" + prefix[i]);
						if (exp.test(cardNo)) prefixValid = true;
					}
				}
				// 卡号长度检查
				var lengths = cards[cardType].lengths.split(",");
				for (var i = 0; i < lengths.length; i++) {
					if (cardNo.length == lengths[i]) lengthValid = true;
				}
				if (!modTenValid || !prefixValid || !lengthValid) {
					return false;
				} else {
					return true;
				}
			}
		},
		isUleCard: function() {
			return this.isCardNo('UleCard');
		},
		isVisa: function() {
			return this.isCardNo('Visa');
		},
		isMasterCard: function() {
			return this.isCardNo('MasterCard');
		},
		// 判断是否为符合EAN规则的条形码串
		isValidEAN: function() {
			var code = this.trim();
			var a = 0,
				b = 0,
				c = parseInt(code.right(1), 10),
				d = code.left(code.length - 1).reverse();
			for (var i = 0; i < d.length; i++) {
				if (i % 2) {
					b += parseInt(d.charAt(i), 10);
				} else {
					a += parseInt(d.charAt(i), 10);
				}
			}
			return ((a * 3 + b + c) % 10) ? false: true;
		},
		// 判断是否为符合EAN-8规则的条形码串
		isEAN8: function() {
			var code = this.trim();
			return (new RegExp(/^\d{8}$/).test(code)) && code.isValidEAN();
		},
		// 判断是否为符合EAN-12规则的条形码串
		isEAN12: function() {
			var code = this.trim();
			return (new RegExp(/^\d{12}$/).test(code)) && code.isValidEAN();
		},
		// 判断是否为符合EAN-13规则的条形码串
		isEAN13: function() {
			var code = this.trim();
			return (new RegExp(/^\d{13}$/).test(code)) && code.isValidEAN();
		},
		// 判断是否为符合ISBN-10规则的条形码串
		isISBN10: function() {
			var code = this.trim();
			if (!new RegExp(/^\d{9}([0-9]|X|x)$/).test(code)) return false;
			var a = 0,
				b = code.right(1),
				c = code.reverse();
			for (var i = 1; i < c.length; i++) {
				a += parseInt(c.charAt(i), 10) * (i + 1);
			}
			if (b == 'X' || b == 'x') b = 10;
			return ((a + parseInt(b, 10)) % 11) ? false: true;
		},
		isISBN: function() {
			return this.isEAN13();
		},
		isEANCode: function() {
			return this.isEAN8() || this.isEAN12() || this.isEAN13() || this.isISBN10();
		}
	});
})(jQuery);

/* Number 原型方法扩展 */
(function($) {
	if (!$) return;
	$.extend(Number.prototype, {
		// 添加逗号分隔，返回为字符串
		comma: function(length) {
			if (!length || length < 1) length = 3;
			var source = ('' + this).split('.');
			source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
			return source.join('.');
		},
		// 生成随机数
		randomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		// 左侧补齐，返回为字符串
		padLeft: function(width, ch) {
			return ('' + this).padLeft(width, ch);
		},
		// 右侧补齐，返回字符串
		padRight: function(width, ch) {
			return ('' + this).padRight(width, ch);
		}
	});
})(jQuery);

/* Array 原型方法扩展 */
(function($) {
	if (!$) return;
	$.extend(Array.prototype, {
		// 删除指定内容项
		remove: function(item, it) {
			this.removeAt(this.indexOf(item, it));
		},
		// 删除指定内容项
		removeAt: function(idx) {
			if (idx >= 0 && idx < this.length) {
				for (var i = idx; i < this.length - 1; i++) {
					this[i] = this[i + 1];
				}
				this.length--;
			}
		},
		// 清除空字符串内容
		removeEmpty: function() {
			var arr = [];
			for (var i = 0; i < this.length; i++) {
				if (this[i].trim() !== '') {
					arr.push(this[i].trim());
				}
			}
			return arr;
		},
		// 添加内容，比push多一个检查相同内容部分
		add: function(item) {
			if (this.indexOf(item) > -1) {
				return false;
			} else {
				this.push(item);
				return true;
			}
		},
		// 过滤重复数据
		unique: function() {
			var a = [],
				o = {},
				i,
				v,
				len = this.length;
			if (len < 2) return this;
			for (i = 0; i < len; i++) {
				v = this[i];
				if (o[v] !== 1) {
					a.push(v);
					o[v] = 1;
				}
			}
			return a;
		},
		// JSON数组排序
		// it: item name  dt: int, char  od: asc, desc
		sortby: function(it, dt, od) {
			var compareValues = function(v1, v2, dt, od) {
				if (dt == 'int') {
					v1 = parseInt(v1, 10);
					v2 = parseInt(v2, 10);
				} else if (dt == 'float') {
					v1 = parseFloat(v1);
					v2 = parseFloat(v2);
				}
				var ret = 0;
				if (v1 < v2) ret = 1;
				if (v1 > v2) ret = -1;
				if (od == 'desc') {
					ret = 0 - ret;
				}
				return ret;
			};
			var newdata = [];
			for (var i = 0; i < this.length; i++) {
				newdata[newdata.length] = this[i];
			}
			for (i = 0; i < newdata.length; i++) {
				var minIdx = i;
				var minData = (it !== '') ? newdata[i][it] : newdata[i];
				for (var j = i + 1; j < newdata.length; j++) {
					var tmpData = (it !== '') ? newdata[j][it] : newdata[j];
					var cmp = compareValues(minData, tmpData, dt, od);
					if (cmp < 0) {
						minIdx = j;
						minData = tmpData;
					}
				}
				if (minIdx > i) {
					var _child = newdata[minIdx];
					newdata[minIdx] = newdata[i];
					newdata[i] = _child;
				}
			}
			return newdata;
		}
	});
})(jQuery);

/* Date 原型方法扩展 */
(function($) {
	if (!$) return;
	$.extend(Date.prototype, {
		// 时间读取
		parse: function(time) {
			if (typeof(time) == 'string') {
				if (time.indexOf('GMT') > 0 || time.indexOf('gmt') > 0 || !isNaN(Date.parse(time))) {
					return this._parseGMT(time);
				} else if (time.indexOf('UTC') > 0 || time.indexOf('utc') > 0 || time.indexOf(',') > 0) {
					return this._parseUTC(time);
				} else {
					return this._parseCommon(time);
				}
			}
			return new Date();
		},
		_parseGMT: function(time) {
			this.setTime(Date.parse(time));
			return this;
		},
		_parseUTC: function(time) {
			return (new Date(time));
		},
		_parseCommon: function(time) {
			var d = time.split(/ |T/),
				d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
				d0 = d[0].split(/[^\d]/);
			return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, (d1[0]||0) - 0, (d1[1]||0) - 0, (d1[2]||0) - 0);
		},
		// 复制时间对象
		clone: function() {
			return new Date().setTime(this.getTime());
		},
		// 时间相加
		dateAdd: function(type, val) {
			var _y = this.getFullYear();
			var _m = this.getMonth();
			var _d = this.getDate();
			var _h = this.getHours();
			var _n = this.getMinutes();
			var _s = this.getSeconds();
			switch (type) {
				case 'y':
					this.setFullYear(_y + val);
					break;
				case 'm':
					this.setMonth(_m + val);
					break;
				case 'd':
					this.setDate(_d + val);
					break;
				case 'h':
					this.setHours(_h + val);
					break;
				case 'n':
					this.setMinutes(_n + val);
					break;
				case 's':
					this.setSeconds(_s + val);
					break;
			}
			return this;
		},
		// 时间相减
		dateDiff: function(type, date2) {
			var diff = date2 - this;
			switch (type) {
				case 'w':
					return diff / 1000 / 3600 / 24 / 7;
				case 'd':
					return diff / 1000 / 3600 / 24;
				case 'h':
					return diff / 1000 / 3600;
				case 'n':
					return diff / 1000 / 60;
				case 's':
					return diff / 1000;
			}
		},
		// 格式化为字符串输出
		format: function(format) {
			if (isNaN(this)) return '';
			var o = {
				'm+': this.getMonth() + 1,
				'd+': this.getDate(),
				'h+': this.getHours(),
				'n+': this.getMinutes(),
				's+': this.getSeconds(),
				'S': this.getMilliseconds(),
				'W': ['日', '一', '二', '三', '四', '五', '六'][this.getDay()],
				'q+': Math.floor((this.getMonth() + 3) / 3)
			};
			if (format.indexOf('am/pm') >= 0) {
				format = format.replace('am/pm', (o['h+'] >= 12) ? '下午': '上午');
				if (o['h+'] >= 12) o['h+'] -= 12;
			}
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp('('+ k +')').test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
				}
			}
			return format;
		}
	});
})(jQuery);

/* jQuery方法扩展: $.browser/$.fn */
(function($) {
	if (!$) return;
	// $.browser方法扩展
	var ua = navigator.userAgent.toLowerCase();
	if (!$.browser) {
		$.browser = {
			version: (ua.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
			safari: /webkit/.test(ua),
			opera: /opera/.test(ua),			
			mozilla: /mozilla/.test(ua) && !/(compatible|webkit)/.test(ua)
		};
	}
	// 增加了IE11的判断
	$.browser.msie = (/msie/.test(ua)||/trident/.test(ua)) && !/opera/.test(ua);
	$.extend($.browser, {
		IEMode: (function() {
			if ($.browser.msie) {
				if (document.documentMode) {
					// >=IE8
					return document.documentMode;
				}
				if (document.compatMode && document.compatMode == 'CSS1Compat') {
					return 7;
				}
				// quirks mode
				return 5;
			}
			return 0;
		})(),
		isIPod: (/iPod/i).test(navigator.userAgent),
		isIPad: (/iPad/i).test(navigator.userAgent),
		isIPhone: (/iPhone/i).test(navigator.userAgent),
		isAndroid: (/Android/i).test(navigator.userAgent),
		isSymbian: (/SymbianOS/i).test(navigator.userAgent),
		isWP: (/Windows Phone/i).test(navigator.userAgent),
		isWin: (/Windows/i).test(navigator.userAgent),
		isMac: (/Mac OS X/i).test(navigator.userAgent),
		isLinux: (/Linux/i).test(navigator.userAgent),
		isWechat: (/micromessenger/i).test(navigator.userAgent.toLowerCase()),
		isPC: function () {
			var userAgentInfo = navigator.userAgent;
			var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
			var flag = true;
			for (var i = 0; i < Agents.length; i++) {
			   if (userAgentInfo.indexOf(Agents[i]) > 0) { flag = false; break; }
			}
			return flag;
		},
		isMobile: function () {
			return (!this.isPC());
		},
		language: function() {
			return (navigator.language || navigator.userLanguage || '').toLowerCase();
		}
	});
	// ----------------------------
	// 获取tagName
	$.fn.tagName = function() {
		if (this.length === 0) return '';
		if (this.length > 1) {
			var tagNames = [];
			this.each(function(i, el) {
				tagNames.push(el.tagName.toLowerCase());
			});
			return tagNames;
		} else {
			return this[0].tagName.toLowerCase();
		}
	};
	// 获取select的文本
	$.fn.optionText = function() {
		if (this.length === 0) return '';
		var sel = this[0];
		if (sel.selectedIndex === -1) return '';
		return sel.options[sel.selectedIndex].text;
	};
	// 获取element属性的JSON值
	$.fn.attrJSON = function(attr) {
		return (this.attr(attr || 'rel') || '').parseAttrJSON();
	};
	// 绑定jQueryUI事件处理
	$.fn.bindJqueryUI = function(action, params) {
		if (this.length === 0) return this;
		var elm = this;
		MDJS.load('jqueryui', function() {
			elm[action](params);
		});
		return this;
	};
	// 绑定MDJS.ui事件处理
	$.fn.bindJendUI = function(type, params, file) {
		if (this.length === 0 || !MDJS) return this;
		if (MDJS.ui && MDJS.ui[type]) {
			MDJS.ui[type](this, params);
			this.data(type + '-binded', true);
			MDJS.debug('bindJendUI.' + type, params);
		} else {
			this.bindJendUIExtend(file || 'ui', type, params);
		}
		return this;
	};
	// 绑定MDJS.ui扩展事件处理
	$.fn.bindJendUIExtend = function(file, type, params) {
		if (this.length === 0 || !MDJS) return this;
		var elm = this;
		MDJS.load(file, function() {
			setTimeout(function() {
				if (!MDJS.ui[type]) return;
				MDJS.ui[type](elm, params);
				elm.data(type + '-binded', true);
				MDJS.debug('bindJendUI.' + type, params);
			}, 200);
		});
		return this;
	};
	
})(jQuery);

/* MDJS core: namespace/define/ready/debug/load/timestat/lang */
(function($) {
	if (!$) return;
	if (!window.MDJS) window.MDJS = {};
	// ----------------------------
	// MDJS.namespace 命名空间
	MDJS.namespace = function(name, sep) {
		var s = name.split(sep || '.'),
			d = {},
			o = function(a, b, c) {
				if (c < b.length) {
					if (!a[b[c]]) {
						a[b[c]] = {};
					}
					d = a[b[c]];
					o(a[b[c]], b, c + 1);
				}
			};
		o(window, s, 0);
		return d;
	};
	// ----------------------------
	// 模块方法定义，其中callback为定义后需要附加执行的处理
	MDJS.define = function(name, value, callback) {
		var obj = this,
			item = name;
		if (name.indexOf('.') > 0) {
			var a = name.split('.');
			item = a.pop();
			var source = a.join('.');
			obj = MDJS.namespace(source);
		}
		if (obj[item]) return;
		obj[item] = value;
		if (callback) callback();
		MDJS.debug('MDJS.define', name, 'info');
	};
	// ----------------------------
	// 类似domready的处理，用以延迟部分方法的执行
	MDJS.ready = function(callback) {
		MDJS.ready.addEvent(callback);
	};
	$.extend(MDJS.ready, {
		events: [],
		addEvent: function(callback) {
			if (!this.events) {
				callback();
				return;
			}
			this.events.push(callback);
		},
		exeEvents: function() {
			if (!this.events) return;
			for (var i = 0; i < this.events.length; i++) {
				this.events[i]();
			}
			this.events = null;
		}
	});
	// ----------------------------
	// MDJS.debug 过程调试
	MDJS.debug = function(a, b, type) {
		if (!this.debugMode) return;
		type = type || 'log';
		if (window.console && console[type]) {
			console[type](new Date().format('hh:nn:ss.S') + ', ' + a, ' = ', b);
		} else {
			MDJS.debug.log(new Date().format('hh:nn:ss.S') + ', ' + a + ' = ' + b);
		}
	};
	$.extend(MDJS.debug, {
		log: function() {
			this.createDOM();
			var p = [],
				v = $('#_jend_debuglog textarea').val();
			for (var i = 0; i < arguments.length; i++) {
				p.push(arguments[i]);
			}
			v += (v === '' ? '': '\n') + p.join(' ');
			$('#_jend_debuglog textarea').val(v);
		},
		clear: function() {
			$('#_jend_debuglog textarea').val('');
		},
		createDOM: function() {
			if ($('#_jend_debuglog').length === 0) {
				var _html = '<div id="_jend_debuglog" style="position:fixed;bottom:0;left:0;right:0;_position:absolute;_bottom:auto;_top:0;padding:5px 0 5px 5px;border:solid 5px #666;background:#eee;z-index:1000;"><textarea style="font-size:12px;line-height:16px;display:block;background:#eee;border:none;width:100%;height:80px;"></textarea><a style="text-decoration:none;display:block;height:80px;width:20px;text-align:center;line-height:16px;padding:5px 0;_padding:6px 0;background:#666;color:#fff;position:absolute;right:-5px;bottom:0;" href="#">关闭调试器</a></div>';
				$('body').append(_html);
				$('#_jend_debuglog a').click(function() {
					$(this).parent().remove();
					return false;
				});
				$('#_jend_debuglog textarea').focus(function() {
					this.select();
				});
			}
		}
	});
	// ----------------------------
	// MDJS.load/MDJS.loader 加载管理
	MDJS.load = function(service, action, params) {
		if ($.isArray(service)) {
			var url = service.join(',');
			var urlsize = service.length;
			var status = MDJS.loader.checkFileLoader(url);
			if (status == urlsize + 1) {
				if (typeof(action) == 'function') action();
			} else if (status > 0) {
				MDJS.loader.addExecute(url, action);
			} else if (status === 0) {
				MDJS.loader.addExecute(url, action);
				MDJS.debug('开始加载JS', url);
				MDJS.loader.fileLoader[url] = 1;
				for (var i = 0; i < urlsize; i++) {
					MDJS.load(service[i], function() {
						MDJS.loader.fileLoader[url]++;
						if (MDJS.loader.fileLoader[url] == urlsize + 1) {
							MDJS.debug('完成加载JS', url);
							MDJS.loader.execute(url);
						}
					});
				}
			}
		} else if (MDJS.loader.serviceLibs[service] && MDJS.loader.serviceLibs[service].requires) {
			MDJS.load(MDJS.loader.serviceLibs[service].requires, function() {
				MDJS.load.run(service, action, params);
			});
		} else {
			MDJS.load.run(service, action, params);
		}
	};
	$.extend(MDJS.load, {
		setPath: function(path) {
			MDJS.loader.serviceBase = path;
		},
		add: function(key, data) {
			if (MDJS.loader.serviceLibs[key]) return;
			if (data.js && (!data.js.startWith('http')) && this.version) {
				data.js = data.js.addQueryValue('v', this.version);
			}
			if (data.css && (!data.css.startWith('http')) && this.version) {
				data.css = data.css.addQueryValue('v', this.version);
			}
			MDJS.loader.serviceLibs[key] = data;
		},
		run: function(service, act, params) {
			var action = (typeof(act) == 'string') ? (function() {
				try {
					var o = eval('MDJS.' + service);
					if (o && o[act]) o[act](params);
				} catch(e) {}
			}) : (act || function() {});
			if (MDJS.loader.checkService(service)) {
				action();
				return;
			}
			var url = MDJS.loader.getServiceUrl(service);
			var status = MDJS.loader.checkFileLoader(url);
			// status:-1异常, 0未加载, 1开始加载, 2完成加载
			if (status === 2) {
				action();
			} else if (status === 1) {
				MDJS.loader.addExecute(url, action);
			} else if (status === 0) {
				if ($('script[src="' + url + '"]').length > 0) {
					MDJS.loader.fileLoader[url] = 2;
					action();
				} else {
					MDJS.loader.addExecute(url, action);
					MDJS.loader.addScript(service);
				}
			} else {
				MDJS.debug('加载异常', service);
			}
		}
	});
	// ----------------------------
	MDJS.define('MDJS.loader', {
		fileLoader: {},
		executeLoader: {},
		serviceBase: (function() {
			return $('script:last').attr('src').sliceBefore('/j/') + '/';
		})(),
		serviceLibs: {},
		checkFullUrl: function(url) {
			return (url.indexOf('/') === 0 || url.indexOf('http://') === 0);
		},
		checkService: function(service) {
			if (this.checkFullUrl(service)) return false;
			try {
				if (service.indexOf('.') > 0) {
					var o = eval('MDJS.' + service);
					return (typeof(o) != 'undefined');
				}
				return false;
			} catch(e) {
				return false;
			}
		},
		checkFileLoader: function(url) {
			return (url !== '') ? (this.fileLoader[url] || 0) : -1;
		},
		getServiceUrl: function(service) {
			var url = '';
			if (this.checkFullUrl(service)) {
				url = service;
			} else if (this.serviceLibs[service]) {
				url = (this.checkFullUrl(this.serviceLibs[service].js)) ? this.serviceLibs[service].js : (this.serviceBase + this.serviceLibs[service].js);
			}
			return url;
		},
		execute: function(url) {
			if (this.executeLoader[url]) {
				for (var i = 0; i < this.executeLoader[url].length; i++) {
					this.executeLoader[url][i]();
				}
				this.executeLoader[url] = null;
			}
		},
		addExecute: function(url, action) {
			if (typeof(action) != 'function') return;
			if (!this.executeLoader[url]) this.executeLoader[url] = [];
			this.executeLoader[url].push(action);
		},
		addScript: function(service) {
			var this_ = this, url;
			if (this.checkFullUrl(service)) {
				url = service;
				this.getScript(url, function() {
					MDJS.debug('完成加载JS', url);
					this_.fileLoader[url] = 2;
					MDJS.loader.execute(url);
				});
			} else if (this.serviceLibs[service]) {
				if (this.serviceLibs[service].css) {
					url = (this.checkFullUrl(this.serviceLibs[service].css)) ? this.serviceLibs[service].css: (this.serviceBase + this.serviceLibs[service].css);
					if (!this.fileLoader[url]) {
						MDJS.debug('开始加载CSS', url);
						this.fileLoader[url] = 1;
						$('head').append('<link rel="stylesheet" type="text\/css"  href="' + url + '" \/>');
					}
				}
				if (this.serviceLibs[service].js) {
					url = (this.checkFullUrl(this.serviceLibs[service].js)) ? this.serviceLibs[service].js: (this.serviceBase + this.serviceLibs[service].js);
					this.getScript(url, function() {
						MDJS.debug('完成加载JS', url);
						this_.fileLoader[url] = 2;
						MDJS.loader.execute(url);
					});
				}
			}
		},
		getScript: function(url, onSuccess, onError) {
			MDJS.debug('开始加载JS', url);
			this.fileLoader[url] = 1;
			this.getRemoteScript(url, onSuccess, onError);
		},
		getRemoteScript: function(url, param, onSuccess, onError) {
			if ($.isFunction(param)) {
				onError = onSuccess;
				onSuccess = param;
				param = {};
			}
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.type = 'text/javascript';
			script.charset = 'utf-8';
			script.src = url;
			for (var item in param) {
				if (item == 'keepScriptTag') {
					script.keepScriptTag = true;
				} else {
					script.setAttribute(item, param[item]);
				}
			}
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
					if (onSuccess) onSuccess();
					script.onload = script.onreadystatechange = null;
					if (!script.keepScriptTag) head.removeChild(script);
				}
			};
			script.onerror = function() {
				if (onError) onError();
			};
			head.appendChild(script);
		}
	});
	// ----------------------------
	// MDJS.timestat 时间分析
	MDJS.define('MDJS.timestat', {
		libs: {},
		loadTime: (typeof(_jend_page_loadtime) == 'number') ? _jend_page_loadtime: new Date().getTime(),
		add: function(name) {
			this.libs[name] = new Date().getTime() - this.loadTime;
		},
		get: function(name) {
			return this.libs[name] || 0;
		}
	});
	// ----------------------------
	// MDJS.lang 多语言支持
	MDJS.define('MDJS.lang', {
		language: 'zh-cn',
		text: {},
		get: function(dataset, name) {
			if (name) {
				if (this.text[dataset]) {
					return this.text[dataset][name] || '';
				} else {
					return '';
				}
			} else {
				return this.text[dataset] || null;
			}
		},
		set: function(dataset, name, value) {
			if (!this.text[dataset]) {
				this.text[dataset] = {};
			}
			if (value) {
				this.text[dataset][name] = value;
			} else {
				this.text[dataset] = name;
			}
		},
		extend: function(dataset, data) {
			if (!this.text[dataset]) {
				this.text[dataset] = {};
			}
			$.extend(this.text[dataset], data);
		}
	});
})(jQuery);

/* MDJS.cookie */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.cookie');
	$.extend(MDJS.cookie, {
		getRootDomain: function() {
			var d = document.domain;
			if (d.indexOf('.') > 0 && !d.isIP()) {
				var arr = d.split('.'),
					len = arr.length,
					d1 = arr[len - 1],
					d2 = arr[len - 2],
					d3 = arr[len - 3];
				d = (d2 == 'com' || d2 == 'net') ? (d3 + '.' + d2 + '.' + d1) : (d2 + '.' + d1);
			}
			return d;
		},
		load: function() {
			var tC = document.cookie.split('; ');
			var tO = {};
			var a = null;
			for (var i = 0; i < tC.length; i++) {
				a = tC[i].split('=');
				tO[a[0]] = a[1];
			}
			return tO;
		},
		get: function(name) {
			var value = this.load()[name];
			if (value) {
				try {
					return decodeURI(value);
				} catch(e) {
					return unescape(value);
				}
			} else {
				return false;
			}
		},
		set: function(name, value, options) {
			options = (typeof(options) == 'object') ? options: {
				minute: options
			};
			var arg_len = arguments.length;
			var path = (arg_len > 3) ? arguments[3] : (options.path || '/');
			var domain = (arg_len > 4) ? arguments[4] : (options.domain || (options.root ? this.getRootDomain() : ''));
			var exptime = 0;
			if (options.day) {
				exptime = 1000 * 60 * 60 * 24 * options.day;
			} else if (options.hour) {
				exptime = 1000 * 60 * 60 * options.hour;
			} else if (options.minute) {
				exptime = 1000 * 60 * options.minute;
			} else if (options.second) {
				exptime = 1000 * options.second;
			}
			var exp = new Date(),
				expires = '';
			if (exptime > 0) {
				exp.setTime(exp.getTime() + exptime);
				expires = '; expires=' + exp.toGMTString();
			}
			domain = (domain) ? ('; domain=' + domain) : '';
			document.cookie = name + '=' + escape(value || '') + '; path=' + path + domain + expires;
		},
		del: function(name, options) {
			options = options || {};
			var path = '; path=' + (options.path || '/');
			var domain = (options.domain) ? ('; domain=' + options.domain) : '';
			if (options.root) domain = '; domain=' + this.getRootDomain();
			document.cookie = name + '=' + path + domain + '; expires=Thu,01-Jan-70 00:00:01 GMT';
		}
	});
})(jQuery);

/* MDJS.json */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.json');
	$.extend(MDJS.json, {
		parse: function(data) {
			return (new Function("return " + data))();
		},
		stringify: function(obj) {
			var m = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"': '\\"',
				'\\': '\\\\'
			};
			var s = {
				'array': function(x) {
					var a = ['['],
						b,
						f,
						i,
						l = x.length,
						v;
					for (i = 0; i < l; i += 1) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof(v) == 'string') {
								if (b) {
									a[a.length] = ',';
								}
								a[a.length] = v;
								b = true;
							}
						}
					}
					a[a.length] = ']';
					return a.join('');
				},
				'boolean': function(x) {
					return String(x);
				},
				'null': function() {
					return 'null';
				},
				'number': function(x) {
					return isFinite(x) ? String(x) : 'null';
				},
				'object': function(x) {
					if (x) {
						if (x instanceof Array) {
							return s.array(x);
						}
						var a = ['{'],
							b,
							f,
							i,
							v;
						for (i in x) {
							v = x[i];
							f = s[typeof v];
							if (f) {
								v = f(v);
								if (typeof(v) == 'string') {
									if (b) {
										a[a.length] = ',';
									}
									a.push(s.string(i), ':', v);
									b = true;
								}
							}
						}
						a[a.length] = '}';
						return a.join('');
					}
					return 'null';
				},
				'string': function(x) {
					if (/["\\\x00-\x1f]/.test(x)) {
						x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
							var c = m[b];
							if (c) {
								return c;
							}
							c = b.charCodeAt();
							return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
						});
					}
					return '\"' + x + '\"';
				}
			};
			return s.object(obj);
		},
		toAttr: function(data) {
			if (typeof(data) == 'object') {
				var attrs = [];
				for (var item in data) {
					attrs.push(item+':'+data[item]);
				}
				return attrs.join(';');
			} else {
				return data;
			}
		}
	});
})(jQuery);

/* MDJS.base */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.base');
	// ----------------------------
	// StringBuilder: 字符串连接
	MDJS.base.StringBuilder = function() {
		this._strings = [];
	};
	$.extend(MDJS.base.StringBuilder.prototype, {
		append: function() {
			var aLen = arguments.length;
			for (var i = 0; i < aLen; i++) {
				this._strings.push(arguments[i]);
			}
		},
		appendFormat: function(fmt) {
			var re = /{[0-9]+}/g;
			var aryMatch = fmt.match(re);
			var aLen = aryMatch.length;
			for (var i = 0; i < aLen; i++) {
				fmt = fmt.replace(aryMatch[i], arguments[parseInt(aryMatch[i].replace(/[{}]/g, ""), 10) + 1]);
			}
			this._strings.push(fmt);
		},
		toString: function() {
			return this._strings.join("");
		}
	});
	// ----------------------------
	// ImageLoader: 图像加载器
	MDJS.base.ImageLoader = function(options) {
		this.options = $.extend({
			src: '',
			min: 0.5,
			max: 30,
			timer: 0.1
		}, options || {});
		var that = this;
		this.init = function() {
			this.loaderId = (new Date()).getTime();
			this.loadStatus = 0;
			this.element = new Image();
			this.element.onload = function() {
				that.loadStatus = 1;
				if (that.options.onLoad) that.options.onLoad();
				MDJS.debug('image onload', that.loaderId + ': ' + this.width + ',' + this.height);
			};
			this.element.onerror = function() {
				that.loadStatus = -1;
				if (that.options.onError) that.options.onError();
				MDJS.debug('image onerror', that.loaderId);
			};
			this.element.src = this.options.src;
			this.startMonitor();
			MDJS.debug('image init', that.loaderId);
		};
		this.startMonitor = function() {
			this.theTimeout = 0;
			var that = this;
			setTimeout(function() {
				that.checkMonitor();
			}, this.options.min * 1000);
		};
		this.checkMonitor = function() {
			if (this.loadStatus !== 0) return;
			this.theTimeout = this.options.min * 1000;
			this._monitor = setInterval(function() {
				that.theTimeout += 50;
				if (that.loadStatus !== 0) {
					clearInterval(that._monitor);
				} else if (that.element.complete) {
					clearInterval(that._monitor);
					that.loadStatus = 1;
					if (that.options.onLoad) that.options.onLoad();
					MDJS.debug('image complete', that.loaderId + ': ' + that.element.width + ',' + that.element.height);
				} else if (that.theTimeout >= (that.options.max * 1000)) {
					clearInterval(that._monitor);
					that.loadStatus = -1;
					if (that.options.onError) that.options.onError();
					MDJS.debug('image timeout', that.loaderId);
				}
			}, that.options.timer * 1000);
		};
		this.init();
	};
})(jQuery);

/* MDJS.ui */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.ui');
	$.extend(MDJS.ui, {
		// == 内部方法 ==========
		// UI各方法参数分析
		bindElementParam: function(elm, params) {
			elm.each(function() {
				this._param =  this._param || {};
				$.extend(this._param, params || $(this).attrJSON());
			});
		},
		// == 模块处理 ==========
		// 模块内容初始化
		ModuleLoaded: function(elm) {
			elm.find('.e-loadmvc').bindJendUI('LoadMVC');
			elm.find('.e-loadevt').bindJendUI('LoadEVT');
			elm.find('.e-loadjui').bindJendUI('LoadJUI');
		},
		LoadEVT: function(elm, attr) {
			if (elm.data('LoadEVT-binded')) return;
			elm.each(function() {
				var attrValue = $(this).attr(attr||'data-onload') || '';
				if (attrValue) eval(attrValue);
			});
		},
		LoadJUI: function(elm) {
			if (elm.data('LoadJUI-binded')) return;
			elm.each(function() {
				var jui = $(this).attr('data-jui') || '';
				var jlib = $(this).attr('data-jlib') || '';
				if (jui !== '') {
					$(this).bindJendUI(jui, null, jlib);
				}
			});
		},
		LoadMVC: function(elm) {
			if (elm.data('LoadMVC-binded')) return;
			elm.each(function() {
				if (!$(this).attr('data-mvc')) return;
				var mvc = $(this).attrJSON('data-mvc');
				var id = mvc.name || this.id || 'mvc'+new Date().getTime();
				MDJS.load.add(id, mvc);
				MDJS.load(id);
			});
		}
	});
})(jQuery);

/* MDJS.util */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.util');
	// ----------------------------
})(jQuery);

/* MDJS.page */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.page');
	// ----------------------------
	$.extend(MDJS.page, {
		// keyHandlers, such as: ESC
		keyHandler: {
			events: {},
			keys: {
				'ESC': 27,
				'PAGEUP': 33,
				'PAGEDOWN': 34,
				'END': 35,
				'HOME': 36,
				'LEFT': 37,
				'TOP': 38,
				'RIGHT': 39,
				'DOWN': 40,
				'INSERT': 45,
				'DELETE': 46,
				'F1': 112,
				'F2': 113,
				'F3': 114,
				'F4': 115,
				'F5': 116,
				'F6': 117,
				'F7': 118,
				'F8': 119,
				'F9': 120,
				'F10': 121,
				'F11': 122,
				'F12': 123
			},
			add: function(doc, key, eventItem, eventCallback) {
				this.events[eventItem] = function(e) {
					try {
						var code = e.which || e.keyCode || 0;
						if (code == MDJS.page.keyHandler.keys[key]) {
							eventCallback();
						}
					} catch(err) {}
				};
				$(doc).bind('keydown', this.events[eventItem]);
			},
			remove: function(doc, eventItem) {
				$(doc).unbind('keydown', this.events[eventItem]);
				this.events[eventItem] = null;
			}
		},
		// ------------------------
		// 设为首页
		setHomepage: function() {
			var url = document.location.href;
			if (url.match(/srcid=[\w]*/)) {
				url = url.replace(/srcid=[\w]*/, 'srcid=homedefault');
			} else {
				url += ((url.indexOf('?') > 0) ? '&': '?') + 'srcid=homedefault';
			}
			if (document.all) {
				document.body.style.behavior = 'url(#default#homepage)';
				document.body.setHomePage(url);
			} else if (window.sidebar) {
				if (window.netscape) {
					try {
						netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
					} catch(e) {
						alert('该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,\n然后将项 signed.applets.codebase_principal_support 值设为true');
					}
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBrance);
				prefs.setCharPref('browser.startup.homepage', url);
			}
		},
		// 加入收藏
		addFavor: function(u, t) {
			var url = u || document.location.href,
				title = t || document.title;
			if (url.match(/srcid=[\w]*/)) {
				url = url.replace(/srcid=[\w]*/, 'srcid=userfavorite');
			} else {
				url += ((url.indexOf('?') > 0) ? '&': '?') + 'srcid=userfavorite';
			}
			try {
				window.external.AddFavorite(url, title);
			} catch(e) {
				try {
					window.sidebar.addPanel(title, url, '');
				} catch(e2) {
					var ctrlStr = ((navigator.userAgent.toLowerCase()).indexOf('mac') != -1) ? 'Command/Cmd': 'CTRL';
					alert('您可以尝试通过快捷键' + ctrlStr + ' + D 加入到收藏夹~');
				}
			}
		},
		// 刷新页面
		refresh: function(url) {
			if (!url) {
				url = document.location.href;
				if (url.indexOf('#') > 0) {
					url = url.sliceBefore('#');
				}
			}
			document.location.href = url;
		},
		// 设置主域(用于不同二级域下的数据访问)
		setDomain: function() {
			var d = document.domain;
			if (d.indexOf('.') < 0 || d.isIP()) return;
			var k = d.split('.'),
				d1 = k[k.length - 1],
				d2 = k[k.length - 2],
				d3 = k[k.length - 3];
			document.domain = (d2 == 'com' || d2 == 'net') ? (d3 + '.' + d2 + '.' + d1) : (d2 + '.' + d1);
		},
		// ------------------------
		// MDJS.util.msgtip 的二次封装
		msgtip: function(source, content, param) {
			param = param || {};
			param.content = content;
			MDJS.load('util-msgtip', function() {
				new MDJS.util.msgtip($(source), param);
			});
		},
		// MDJS.util.popbox 的二次封装
		popbox: function(param) {
			MDJS.load('util.popbox', 'show', param);
		},
		// MDJS.util.dialog 相关方法的二次封装
		alert: function(message, callback) {
			var params = (typeof(message) == 'object') ? message: {
				message: message,
				callback: callback
			};
			MDJS.load('util.dialog', 'alert', params);
		},
		showSuccess: function(message, callback) {
			var params = (typeof(message) == 'object') ? message: {
				message: message,
				callback: callback
			};
			params.type = 'success';
			MDJS.load('util.dialog', 'alert', params);
		},
		showError: function(message, callback) {
			var params = (typeof(message) == 'object') ? message: {
				message: message,
				callback: callback
			};
			params.type = 'error';
			MDJS.load('util.dialog', 'alert', params);
		},
		confirm: function(message, callback, cancel) {
			var params = (typeof(message) == 'object') ? message: {
				message: message,
				callback: callback,
				cancel: cancel
			};
			MDJS.load('util.dialog', 'confirm', params);
		},
		prompt: function(message, callback) {
			var params = (typeof(message) == 'object' && !$.isArray(message)) ? message: {
				message: message,
				callback: callback
			};
			MDJS.load('util.dialog', 'prompt', params);
		},
		showLoading: function(message) {
			var params = (typeof(message) == 'object') ? message: {
				loadingText: message
			};
			MDJS.load('util.dialog', 'showLoading', params);
		},
		hideLoading: function(effect) {
			MDJS.load('util.dialog', 'close', effect || '');
		},
		closeDialog: function(effect) {
			MDJS.load('util.dialog', 'close', effect || '');
		},
		dialog: function(params) {
			MDJS.load('util.dialog', 'open', params);
		}
	});
	$.extend(MDJS.page.popbox, {
		close: function() {
			MDJS.load('util.popbox', 'close', null);
		}
	});
	$.extend(MDJS.page.dialog, {
		init: function(options) {
			MDJS.load('util.dialog', function() {
				MDJS.util.dialog.init();
				MDJS.util.dialog.setStyle(options);
			});
		},
		pop: function(params) {
			MDJS.load('util.dialog', 'pop', params);
		},
		poptab: function(tabs, width, height) {
			var params = tabs[0];
			$.extend(params, {
				tabs: tabs,
				width: width,
				height: height
			});
			MDJS.load('util.dialog', 'pop', params);
		},
		show: function(params) {
			MDJS.load('util.dialog', 'show', params);
		},
		ajax: function(params) {
			MDJS.load('util.dialog', 'ajax', params);
		},
		form: function(frm, title, width, height) {
			// 需要考虑一个扩展，增加一个callback，以便于处理成功后由iframe页面上来调用父页面上的callback方法。
			var frameId = 'frame' + (new Date()).getTime();
			var tmpl = '<iframe id="{frameId}" name="{frameId}" src="about:blank" width="100%" height="100%" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0"></iframe>';
			var params = {};
			params.title = title;
			params.width = width;
			params.height = height;
			params.content = tmpl.substitute({
				frameId: frameId
			});
			params.callback = function() {
				frm.target = frameId;
				frm.submit();
			};
			MDJS.page.dialog(params);
			return false;
		},
		setContent: function(html) {
			MDJS.load('util.dialog', function() {
				MDJS.util.dialog.setContent(html);
				MDJS.util.dialog.setAutoHeight();
			});
		},
		setConfig: function(attr, value) {
			MDJS.load('util.dialog', function() {
				MDJS.util.dialog[attr] = value;
			});
		},
		close: function(effect) {
			MDJS.load('util.dialog', 'close', effect || '');
		}
	});
	// ----------------------------
	// 页面初始化处理
	MDJS.page.init = function() {
		// 将ready的方法批量执行
		if (MDJS.ready) MDJS.ready.exeEvents();
		// 对标准模块进行相应处理
		$(document).bindJendUI('ModuleLoaded');
		MDJS.debug('page', '开始初始化');
	};
	$(function() {
		MDJS.page.init();
	});
})(jQuery);

/* MDJS.login */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.login');
	$.extend(MDJS.login, {
		checkUserStatus: function() {
			this.mallcookie = (MDJS.cookie.get('unm') || '');
			return (!!this.mallcookie);
		}
	});
})(jQuery);

/* MDJS.track */
(function($) {
	if (!$ || !window.MDJS) return;
	// ----------------------------
	MDJS.namespace('MDJS.track');
	$.extend(MDJS.track, {
		// 自动设置相应js的访问源
		scriptPath: '//s.',
		// 统计初始化，默认加载uspm/uletrack/baidu/google
		init: function(options) {
			options = options || {
				baidu: true,
				google: true
			};
			if (options.baidu) {
				this.baidu.init();
			}
			if (options.google) {
				this.google.init();
			}
		},
		// 页面JS文件加载
		loadJS: function(url, isAsync) {
			if (isAsync) {
				MDJS.loader.getRemoteScript(url, { async:true, keepScriptTag:true });
			} else {
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement("script");
				script.type = 'text/javascript';
				script.charset = 'utf-8';
				if (url.indexOf('baidu' > -1)) script.charset = 'gbk';
				script.src = unescape(url);
				head.appendChild(script);
			}
		},
		timestat: {
			loadTime: window._jend_page_loadtime || 0,
			initTime: new Date().getTime(),
			datas: {},
			add: function(name) {
				this.datas[name] = new Date().getTime() - (this.loadTime || this.initTime);
			},
			get: function(name) {
				return this.datas[name] || 0;
			}
		},
		maidouPC: {
			init: function () {
				MDJS.track.loadJS('//s.maidou.com/pc/common/js/pcstatistics.js');
			}
		},
		maidouH5: {
			init: function () {
				MDJS.track.loadJS('//s.maidou.com/h5/common/js/h5statistics.js');
			}
		},
		baidu: {
			// 百度uid key值
			uid: '5e28c02b5c0f7ef4b68674357288b4eb',
			setUid: function(uid) {
				this.uid = uid;
			},
			// 百度统计初始化, 异步加载时有问题不提交数据
			init: function(uid) {
				window._hmt = window._hmt || [];
				MDJS.track.loadJS('//hm.baidu.com/h.js%3F'+ (uid||this.uid));
			}
		},
		google: {
			uid: 'UA-63096506-1',
			domain: 'maidou.com',
			setUid: function(uid) {
				this.uid = uid;
			},
			setDomain: function(domain) {
				this.domain = domain;
			},
			// google统计初始化
			init: function(uid, domain) {
				var url = MDJS.track.scriptPath + 'maidou.com/googleana/analytics.js';
				(function(i, s, o, g, r, a, m) {
					i['GoogleAnalyticsObject'] = r;
					i[r] = i[r] || function() {	(i[r].q = i[r].q || []).push(arguments); }, i[r].l = 1*new Date();
					a = s.createElement(o), m = s.getElementsByTagName(o)[0];
					a.async = 1;
					a.src = g;
					m.parentNode.insertBefore(a, m);
				})(window, document, 'script', url, 'ga');
				ga('create', uid||this.uid, domain||this.domain);
				ga('require', 'displayfeatures');
				ga('send', 'pageview');
			},
			// 发送自定义数据
			// hitType： pageview/event/social/timing
			send: function(hitType, data) {
				window.ga && ga('send', hitType, data);
			},
			initEC: function() {
				window.ga && ga('require', 'ecommerce', 'ecommerce.js');
			},
			sendEC: function(orderData, itemDatas) {
				if (window.ga) {
					// 暂时用tax字段来保存 cartType.payType信息
					if (orderData.metric4 && orderData.metric5) {
						if (!isNaN(orderData.metric4+'.'+orderData.metric5)) {
							orderData.tax = orderData.metric4 +'.'+ orderData.metric5;
						}
					}
					ga('ecommerce:addTransaction', orderData);
					for (var i=0; i<itemDatas.length; i++) {
						ga('ecommerce:addItem', itemDatas[i]);
					}
					ga('ecommerce:send');
				}
			}
		}
	});
})(jQuery);

/* MDJS init */
(function($) {
	if (!$ || !window.MDJS) return;
	var st = '//s.md.com'
	// ----------------------------
	//MDJS.load.version = '130701';
	MDJS.load.add('ui', {          js: st+'/js/MDJS/util/common.min.js' });
	MDJS.load.add('calendar', {    js: st+'/js/MDJS/util/calendar_v2.js', css: st+'/js/MDJS/util/calendar_v2.css' });
	MDJS.load.add('util.dialog', { js: st+'/js/MDJS/util/dialog.js',      css: st+'/js/MDJS/util/dialog.css' });
	MDJS.load.add('map', {         js: st+'/js/MDJS/util/map.js'});
	MDJS.load.add('GMap', {        js: 'http://maps.google.cn/maps/api/js?libraries=geometry&sensor=false&key=AIzaSyBpv83qoZJrtW32r-e-E2ZkXwcYGOZUzrI'});
})(jQuery);

(function($) {
	if (!$ || !window.MDJS) return;
	MDJS.server = {
		url:    'www.md.com',	// HOST
		mdUrl:  'md.com',		// 域
		static: 's.md.com',		// 静态资源
		name:   'maidou'
	}
	MDJS.debug('MDJS.js','加载完成');
})(jQuery);