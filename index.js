const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//endpoint 1
app.get('/cart-total', (req, res) => {
  let newitemprice = parseFloat(req.query.newitemprice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newitemprice + cartTotal).toString());
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
function CalculateTax(CartTotal) {
  let TotalTax = (CartTotal * taxRate) / 100;
  return TotalTax.toString();
}

app.get('/Calculate-Tax', (req, res) => {
  let CartTotal = parseFloat(req.query.CartTotal);
  res.send(CalculateTax(CartTotal));
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
function CalculateLoyaltyPoint(PurchaseAmount) {
  let loyaltyPoint = PurchaseAmount * 2;
  return loyaltyPoint.toString();
}

app.get('/loyalty-Points', (req, res) => {
  let PurchaseAmount = parseFloat(req.query.PurchaseAmount);
  res.send(CalculateLoyaltyPoint(PurchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
