// Customer
class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  addOrder(order) {
    this.orders.push(order);
  }
}

// Order
class Order {
    Payment=null;
    orderDetails=[];
  constructor(date, status){
    this.date = date;
    this.status = status;
  }

  calcSubTotal() {
let subTotal =0 ;
    for (let i = 0; i < this.orderDetails.length; i++){
      subTotal += this.orderDetails[i].calcSubTotal();
    }
    return subTotal;
    //return this.orderDetails.reduce((subTotal , orderDetail) => subtotal+orderDetail.calsSubTotal(),
    //0
    //);
    }
  

  calcTax() {
    let tax = 0;
    for (let i = 0; i< this.orderDetails.length; i++){
      tax += this.orderDetails[i].calcTax();
    }
    return tax;
  }

  calcTotal() {
    return this.calcSubTotal()+this.calcTax();
  }

  calcTotalWeight() {
    let weight = 0;
    for (let i = 0; i<this.orderDetails.length; i++){
      weight += this.orderDetails[i].calcTotalWeight();
    }
    return weight;
  }

  addPayment(payment){
    this.Payment = payment;
  }

  addOrderDetail(orderDetail){
    this.orderDetails.push(orderDetail);
  }
}

// OrderDetail
class OrderDetail {
    item = null;
  constructor(quantity, taxStatus) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
  }

  calcSubTotal() {
    return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
  }

  calcWeight() {
    return this.item.shippingWeight;
  }

  calcTax() {
    return this.item.getTax(this.taxStatus);
  }
  
  addItem(item){
    this.item=item;
  }
}

// Item
class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }
  setinStock(status){
    this.inStock=status;
  }
  getPriceForQuantity(quantity) {
    return this.price * quantity;
  }

  getTax(taxStatus) {
    if(taxStatus === "Tax included"){
      return 0;
    }
    else{
      return this.price*0.07;
    }
    // console.log("getTax");
  }

  inStock() {
    return this.inStock
  }
}

// Payment
class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}

// Cash
class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
}

// Check
class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }

  authorized() {
    // console.log("authorized");
  }
}

// Credit
class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }

  authorized() {
    // console.log("authorized");
  }
}

const main = () => {
  let customer1 = new Customer("Vick", "5/9");
  let customer2 = new Customer("Best","Bangpae")
  // console.log(customer1);
  // Product Items
  const item1 = new Item(0.3,"ออลอินวันบักเก็ต",299);
  const item2 = new Item(0.1,"ป็อบบอมบ์แซ่บ",39);
  const item3 = new Item(0.2,"เดอะบ็อกซ์ ออลสตาร์",159);
  const item4 = new Item(0.2,"ชิ๊คแอนด์แชร์ ",99);
  const item5 = new Item(0.3,"คอมโบข้าวไก่กรอบแกงเขียวหวาน",89);
  // Create order
  const order1 = new Order("08/01/2567","In Process");
  const order2 = new Order("09/01/2567","In Process");

  // Add order to a customer
  customer1.addOrder(order1);
  customer1.addOrder(order2);

  customer2.addOrder(order1);
  customer2.addOrder(order2);

  // Create order detail
  const orderDetail1 = new OrderDetail(5,"tax included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2,"tax included");
  orderDetail2.addItem(item5);
  const orderDetail3 = new OrderDetail(1,"tax included");
  orderDetail1.addItem(item2);
  const orderDetail4 = new OrderDetail(2,"tax included");
  orderDetail2.addItem(item5);



  // Add order detail to an order
  order1.addOrderDetail(orderDetail1);
  order2.addOrderDetail(orderDetail2);

  // console.log(orderDetail1);

   console.log(customer1);
   console.log(customer2);


  //Name : Vick
  //Order number:1
  //1 ป๊อบบอมบ์แซ่บ จำนวน 5 ชิ้น ราคา195บาท
  //2 คอมโบข้าวไก่กรอบแกงเขียวหวาน จำนวน2 ชิ้น ราคา178บาท
  //รวมทั้งหมด 374 บาท

  //คำสั่งซื้อที่ 1 
  //ลำดับที่ 1 ป๊อปบอมแซ่บ
  //ลำดับที่ 2 คอมโบข้าวไก่กรอบแกงเขียวหวาน
  console.log("ชื่อ: " + customer1.name);
  console.log("จำนวนคำสั่งซื้อ: " + customer1.orders.length); 

 

  for (let i = 0; i < customer1.orders.length; i++) {
    console.log("คำสั่งซื้อที่: " + (i + 1));
    let total = 0
    // console.log(customer1.orders[i].orderDetail);
    for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
      const item = customer1.orders[i].orderDetails[k].item;
      const quantity = customer1.orders[i].orderDetails[k].quantity
      const subTotal = quantity * item.price;
      total += subTotal;
        console.log
        ("ลำดับที่ " + 
        (k + 1) + 
        " " + 
        item.description +
        "จำนวน"+
       quantity +
       "รายการ" +
       "ราคา" +
       subTotal +
       "บาท"
       );
  
    }
    console.log("รวมทั้งหมด"+total + "บาท");
}


console.log("ชื่อ: " + customer2.name);
console.log("จำนวนคำสั่งซื้อ: " + customer2.orders.length); 
for (let i = 0; i < customer2.orders.length; i++) {
  console.log("คำสั่งซื้อที่: " + (i + 1));
  let total = 0
  // console.log(customer1.orders[i].orderDetail);
  for (let k = 0; k < customer2.orders[i].orderDetails.length; k++) {
    const item = customer2.orders[i].orderDetails[k].item;
    const quantity = customer2.orders[i].orderDetails[k].quantity
    const subTotal = quantity * item.price;
    total += subTotal;
      console.log
      ("ลำดับที่ " + 
      (k + 1) + 
      " " + 
      item.description +
      "จำนวน"+
     quantity +
     "รายการ" +
     "ราคา" +
     subTotal +
     "บาท"
     );

  }
  console.log("รวมทั้งหมด"+total + "บาท");
}

}
  main();
  


