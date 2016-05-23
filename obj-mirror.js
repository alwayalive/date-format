function mirror( F ){
	var f = Object.create( F.prototype ),
		__proto__ = !!Object.getPrototypeOf ? Object.getPrototypeOf( f ) : f.__proto__;
	__proto__.constructor = F;
	__proto__.constructor.prototype = __proto__;
	return f;
}
module.exports = mirror;