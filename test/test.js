var dateFormat = require("../date-format"),
	assert = require("assert");
	
describe("dateFormat test",function(){

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
			//...etc
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
});