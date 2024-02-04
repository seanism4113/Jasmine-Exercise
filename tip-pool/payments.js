// number input that hold Bill amount
let billAmtInput = document.getElementById('billAmt');
// number input that holds tip amount
let tipAmtInput = document.getElementById('tipAmt');
// form that contain the bill amount input, tip amount input, and submit button
let paymentForm = document.getElementById('paymentForm');

// Payment table is blank table with headers that will hold information: bill amount, tip amount, and Tip %
// variable below set for the body of the Payment Table
let paymentTbody = document.querySelector('#paymentTable tbody');
// The summary Table contains the headers and information that will contain: Bill total, Tip total, and Tip % average
// variable below set to a cell in a row in this table
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

// Variable to contain object list.  allPayments will hold:
// EXAMPLE: payment(1) : bill amt: "1", tip amt: "1", tip percentage: 4;
let allPayments = {};
// a counter to create a new paymentID for each new payment;
let paymentId = 0;

// add event listener for Payment form only when submit button is clicked. 
// argument accepted is the submitPaymentInfo function.
paymentForm.addEventListener('submit', submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // if Payment form is submitted, prevent submit of form.

  // set a variable to hold an object.  Object contains the below values:
  // bill Amt: bill Amt --> holds input value for bill Amount
  // tip Amt: tip Amt: holds the input value for the tip amount
  // tip Percent: holds the input value for the tip percent;
  let curPayment = createCurPayment();

  // if statement for if there are values input for the curPayment object listed above.
  if (curPayment) {
    // add 1 to the payment ID counter
    paymentId += 1;

  // set "payment" + paymentID as the index for the current payment
    allPayments['payment' + paymentId] = curPayment;
    // pass curPayment into the amendPaymentTable function
    appendPaymentTable(curPayment);
    // pass the updateServerTable function
    updateServerTable();
    // pass the Update Summary function
    updateSummary();

    // clear the form PaymentForm input fields
    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  // if statement for if one of the fields on the Payment form is blank.  Exit the function.
  if (billAmt === '' || tipAmt === '') return;

  //if statement for bill amount and tip amount.  
  // Takes the strings and converts them to numbers to see if they are greater
  // or equal to 0;  Bill amount must be greater than 0.  Tip amount can be 0 or greater.
  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    // return from the function the below information.  Used as parameters for the submitPaymentInfo function.
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Create table row element and pass to appendTd with input value
// it accepts in currPayment as an argument
function appendPaymentTable(curPayment) {
  // create new table row
  let newTr = document.createElement('tr');
  // assign id to row of payment + paymentID#
  newTr.id = 'payment' + paymentId;

  // send the below to the appendTd function which is in helpers.js
  // appendTd sends back a new td to add to the row
  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + '%');
  appendDeleteButton(newTr);

  // add the new row to the payment table in the body
  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg;
  // sumPaymentTotal function is in helpers.js.  Pass tipPercent to function
  let paymentTotal = sumPaymentTotal('tipPercent');

  // set variable for the total number of payments made, by taking the number of keys
  // in the allPayments function and using the .length function.
  let numberOfPayments = Object.keys(allPayments).length;

  // if statement to calculate tip Average for all payments
  if (paymentTotal === 0 && numberOfPayments === 0) {
    tipPercentAvg = 0;
  } else {
    tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
  }

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML =  Math.round(tipPercentAvg) + '%';
}

paymentTbody.addEventListener('click', function(e){

  if(e.target.classList.contains('removeTr')){

    delete allPayments[e.target.parentElement.id];
    updateSummary();
    updateServerTable();
    e.target.parentElement.remove();
  }

});
