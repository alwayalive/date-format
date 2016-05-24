var patternStr = "yyyy-MM-dd hh:mm:ss",
    objMirror = require("./obj-mirror");

function DateFormat(dateObj, pattern) {
    var self = objMirror(DateFormat);

    self.pattern = pattern || patternStr;
    if (!dateObj) {
        self._date = new Date;
        return self;
    }
    if (dateObj instanceof DateFormat)
        self._date = dateObj._date;
    else if (dateObj instanceof Date)
        self._date = dateObj;
    else
        self._date = parseStr2Date(dateObj);
    return self;
}

DateFormat.prototype.toString = function(pattern) {
    return (pattern || this.pattern).replace(/(\%Y)|(YYYY)/i, this._date.getFullYear()).replace(/(\%M)|(MM)/, this.zeroize.call(this._date.getMonth() + 1, 2)).replace(/(\%D)|(DD)/i, this.zeroize.call(this._date.getDate(), 2)).replace(/(\%H)|(HH)/i, this.zeroize.call(this._date.getHours(), 2)).replace(/(\%m)|(mm)/, this.zeroize.call(this._date.getMinutes(), 2)).replace(/(\%S)|(SS)/i, this.zeroize.call(this._date.getSeconds(), 2));
}
DateFormat.prototype.reset = function() {
    initDate.apply(this, arguments);
    return this;
}
DateFormat.prototype.dayofmm = 86400000;
DateFormat.prototype.hourofmm = 3600000;
DateFormat.prototype.minuteofmm = 60000;
DateFormat.prototype.addDay = function(dd) {
    this._date.setTime((this._date.getTime() + dd * this.dayofmm).toFixed(0));
    return this;
}
DateFormat.prototype.addHour = function(hh) {
    this._date.setTime((this._date.getTime() + hh * this.hourofmm).toFixed(0));
    return this;
}
DateFormat.prototype.addMinu = function(mm) {
    this._date.setTime((this._date.getTime() + mm * this.minuteofmm).toFixed(0));
    return this;
}
DateFormat.prototype.addMonth = function(m) {
    this._date.setMonth((this._date.getMonth() + m).toFixed());
    return this;
}
DateFormat.prototype.zeroize = function(a) {
    var v = this.toString(),
        len = v.length;
    return (a -= len) > 0 ? new Array(++a).join(0).concat(v) : v;
}

function initDate(date, pattern) {
    this.pattern = pattern || patternStr;
    if (!date) {
        this._date = new Date;
        return;
    }
    if (date instanceof DateFormat)
        this._date = date._date;
    else if (date instanceof Date)
        this._date = date;
    else
        this._date = parseStr2Date(date);
}

function parseStr2Date(str) {
    var dateFlied,
        _date = new Date();
    if (/^\d+$/.test(str)) {
        _date.setTime(str);
    } else {
        dateFlied = str.split(/\D+/);
        if (!!dateFlied[0]) {
            _date.setFullYear(dateFlied[0]);
            _date.setMonth((dateFlied[1] - 1) || 0);
            _date.setDate(dateFlied[2] || 1);
            _date.setHours(dateFlied[3] || 0);
            _date.setMinutes(dateFlied[4] || 0);
            _date.setSeconds(dateFlied[5] || 0);
            _date.setMilliseconds(dateFlied[6] || 0);
        }
        // if (!!dateFlied[3])
        //     _date.setHours(dateFlied[3]);
        // if (!!dateFlied[4])
        //     _date.setMinutes(dateFlied[4]);
        // if (!!dateFlied[5])
        //     _date.setSeconds(dateFlied[5]);
        // if (!!dateFlied[6])
        //     _date.setMilliseconds(dateFlied[6]);
    }
    return _date;
}

module.exports = DateFormat;
