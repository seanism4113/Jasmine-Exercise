describe("Payments test)", function() {
    beforeEach(function () {
      billAmtInput.value = 285;
      tipAmtInput.value = 62.70;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
      createCurPayment();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment1'].billAmt).toBe('285');
      expect(allPayments['payment1'].tipAmt).toEqual('62.7');
      expect(allPayments['payment1'].tipPercent).toEqual(22);
    });

    it('if bill Amt is empty or tip Amt is empty do not add payment method', function() {
        billAmtInput.value = "";
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);

        billAmtInput.value = "285";
        tipAmtInput.value = "";
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toBe(0);
    });

    it('should not submit to allPayments if billtoAmt is 0', function() {
        billAmtInput.value ="0";
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toBe(0);
    });

    it('should create new currentPayment', function() {
        billAmtInput.value = 500;
        tipAmtInput.value = 50;
        
        let newPayment = {
            billAmt : '500',
            tipAmt : '50',
            tipPercent: 10
        }

        expect(createCurPayment()).toEqual(newPayment);

    });

    afterEach(function (){
        billAmtInput.value = "";
        tipAmtInput.value = "";
        summaryTds[0].innerHTML = "";
        summaryTds[1].innerHTML = "";
        summaryTds[2].innerHTML = "";
        allPayments = {};
        paymentTbody.innerHTML = "";
    })

})