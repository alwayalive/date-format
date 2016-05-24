#日期格式化函数
使用各种pattern得到所需的日期格式。

###运行测试
1、```npm install```

2、```npm test```

###使用方式

得到DateFormat类
```javascript
var DateFormat = require("./date-format")
```

####DateFormat.constructor
这里使用<a target="_blank" href="https://github.com/alwayalive/obj-mirror">obj-mirror</a>，使用时可以省略new
返回DateFormat实例
```javascript
//date instanceof Date === true
//typeof date === 'string'
//date instanceof DateFormat === true

DateFormat([date][,pattern])  
```

####DateFormat.prototype
```javascript
//%y yyyy 年
//%M MM 月
//%D dd 日
//%h hh 小时
//%m mm 分钟
//%s ss	秒
toString( [pattern] )	//格式化输出(默认格式yyyy-MM-dd hh:mm:ss)

addMonth( n )	//操作月份；返回DateFormat实例

addDay( n )		//操作天数；返回DateFormat实例

addHour( n )	//操作小时数；返回DateFormat实例

addMinu( n )	//操作分钟数；返回DateFormat实例

// n 整数代表未来时间，负数代表过去时间

reset( [date][,pattern] )	//重新调用内部的init方法，在原来的实例上重置日期与日期格式；返回DateFormat实例

```

####日期格式化输出

```javascript

describe("date pattern transitor",function(){
		
	it("print default pattern : yyyy-MM-dd hh:mm:ss",function(){
		var dataStr = dateFormat();
		assert.strictEqual( typeof dataStr.toString() , "string" );
	});

	it("print variety pattern",function(){
		var dataStr = dateFormat("2011-01-10");
		assert.strictEqual( dataStr.toString("yyyy年MM月dd日") , "2011年01月10日" );
		assert.strictEqual( dataStr.toString("%y年%M月%d日") , "2011年01月10日" );
		assert.strictEqual( dataStr.toString("MM/dd") , "01/10" );
	});
});

//操作时间
describe("time operation",function(){

	//前几个月与后几个月
	it("month",function(){
		var dataStr = dateFormat("2011-05-10","yyyy-MM-dd");
		assert.strictEqual( dataStr.addMonth(1).toString() , "2011-06-10" );
		assert.strictEqual( dataStr.addMonth(-1).toString() , "2011-05-10" );
	});

	//前几个天与后几个天
	it("day",function(){
		var dataStr = dateFormat("2011-05-10","yyyy-MM-dd");
		assert.strictEqual( dataStr.addDay(10).toString() , "2011-05-20" );
		assert.strictEqual( dataStr.addDay(-10).toString() , "2011-05-10" );
	});

	//前几小时与后几小时
	it("hour",function(){
		var dataStr = dateFormat("2011-05-10 12:10:00");
		assert.strictEqual( dataStr.addHour(10).toString() , "2011-05-10 22:10:00" );
		assert.strictEqual( dataStr.addHour(-10).toString() , "2011-05-10 12:10:00" );
	});

	//前几分钟与后几分钟
	it("minute",function(){
		var dataStr = dateFormat("2011-05-10 12:10:00");
		assert.strictEqual( dataStr.addMinu(10).toString() , "2011-05-10 12:20:00" );
		assert.strictEqual( dataStr.addMinu(-10).toString() , "2011-05-10 12:10:00" );
	});

});

//reset函数使用方式
describe("reset dateFormat",function(){
	it("reset()",function(){
		var dataStr = dateFormat("2011-01-10");
		assert.strictEqual( dataStr.toString() , "2011-01-10 00:00:00" );

		dataStr.reset("2015/06/14 12:19:00");
		assert.strictEqual( dataStr.toString() , "2015-06-14 12:19:00" );
	});
});
```