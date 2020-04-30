var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500订金，100优惠券");
  } else {
    return "nextSuccessor";
  }
};

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200订金，50优惠券");
  } else {
    return "nextSuccessor";
  }
};
var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买，无优惠");
  } else {
    return "库存不足";
  }
};

var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};
Chain.prototype.setNextSuccessor = function (successor) {
  this.successor = successor;
};
Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);
  console.log(ret, "passrequest");
  if (ret === "nextSuccessor") {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }
  return ret;
};

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(1, false, 0);
