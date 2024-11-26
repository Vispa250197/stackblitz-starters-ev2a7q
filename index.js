let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});

//endpoint 2
function calculateDiscount(cartTotal, isMember) {
  if (isMember) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  return cartTotal.toString();
}

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateDiscount(cartTotal, isMember));
});

//endpoint 3
function calculateTax(cartTotal) {
  let TotalTax = (cartTotal * taxRate) / 100;
  return TotalTax.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});

//endpoint 4
function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else if (shippingMethod === 'express') {
    return distance / 100;
  } else return null;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

//endpoint 5
function calculateshippingcost(weight, distance) {
  let shippingcost = weight * distance * 0.1;
  return shippingcost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateshippingcost(weight, distance));
});

//endpoint 6
function CalculateLoyaltyPoint(purchaseAmount) {
  let loyaltypoint = purchaseAmount * 2;
  return loyaltypoint.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(CalculateLoyaltyPoint(purchaseAmount));
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
