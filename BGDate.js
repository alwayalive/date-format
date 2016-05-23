var pattern = "yyyy-MM-dd hh:mm:ss";

function initDate(__pattern, __date) {
    this.pattern = __pattern || pattern;
    if (!__date) {
        this._date = new Date;
        return;
    }
    if (__date instanceof BGDate)
        this._date = __date._date;
    else if (__date instanceof Date)
        this._date = __date;
    else
        this._date = parseStr2Date(__date);
}

function parseStr2Date(str) {
    var dateFlied,
        _date = new Date();
    if (/^\d+$/.test(str)) {
        _date.setTime(str);
    } else {
        dateFlied = str.split(/\D+/);
        if (typeof dateFlied[0] === "number")
            _date.setFullYear(dateFlied[0]);
        if (typeof dateFlied[1] === "number")
            _date.setMonth(dateFlied[1]);
        if (typeof dateFlied[2] === "number")
            _date.setHours(dateFlied[2] - 1);
        if (typeof dateFlied[3] === "number")
            _date.setDate(dateFlied[3]);
        if (typeof dateFlied[4] === "number")
            _date.setMinutes(dateFlied[4]);
        if (typeof dateFlied[5] === "number")
            _date.setSeconds(dateFlied[5]);
        if (typeof dateFlied[6] === "number")
            _date.setMilliseconds(dateFlied[6]);
    }
    return _date;
}

/**
 * arguments[0]	日期格式
 * arguments[1]	日期参数
 */
var BGDate = function BGDate() {
    if (this === global || !this) {
        return (new BGDate(arguments[0], arguments[1])).toString();
    } else {
        initDate.apply(this, arguments);
    }
}
BGDate.prototype.toString = function(__pattern) {
    return (__pattern || this.pattern).replace(/(\%Y)|(YYYY)/i, this._date.getFullYear()).replace(/(\%M)|(MM)/, this.zeroize.call(this._date.getMonth() + 1, 2)).replace(/(\%D)|(DD)/i, this.zeroize.call(this._date.getDate(), 2)).replace(/(\%H)|(HH)/i, this.zeroize.call(this._date.getHours(), 2)).replace(/(\%m)|(mm)/, this.zeroize.call(this._date.getMinutes(), 2)).replace(/(\%S)|(SS)/i, this.zeroize.call(this._date.getSeconds(), 2));
}
BGDate.prototype.reset = function() {
    initDate.apply(this, arguments);
    return this;
}
BGDate.prototype.dayofmm = 86400000;
BGDate.prototype.hourofmm = 3600000;
BGDate.prototype.minuteofmm = 60000;
BGDate.prototype.addDay = function(dd) {
    this._date.setTime((this._date.getTime() + dd * this.dayofmm).toFixed(0));
    return this;
}
BGDate.prototype.addHour = function(hh) {
    this._date.setTime((this._date.getTime() + hh * this.hourofmm).toFixed(0));
    return this;
}
BGDate.prototype.addMinu = function(mm) {
    this._date.setTime((this._date.getTime() + mm * this.minuteofmm).toFixed(0));
    return this;
}
BGDate.prototype.addMonth = function(m) {
    this._date.setMonth((this._date.getMonth() + m).toFixed());
    return this;
}
BGDate.prototype.zeroize = function(a) {
    var v = this.toString(),
        len = v.length;
    return (a -= len) > 0 ? new Array(++a).join(0).concat(v) : v;
}

module.exports = BGDate;