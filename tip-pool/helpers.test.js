describe ('test SumPaymentTotal and calculateTipPercent functions', function(){
    beforeEach( function(){
        billAmtInput.value = 285;
        tipAmtInput.value = 62.70;
        submitPaymentInfo();
    });

    it('should add a new bill amount tip amount and Tip Percent to allPayments', function () {
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(Object.keys(allPayments)[0]).toEqual('payment1');
        expect(allPayments['payment1'].billAmt).toEqual('285');
        expect(allPayments['payment1'].tipAmt).toEqual('62.7');
        expect(allPayments['payment1'].tipPercent).toEqual(22);
    })

    it('add all tip amounts, payments & tip% to sumTotalPayments function', function() {
        expect(sumPaymentTotal('tipAmt')).toBe(62.70);
        expect(sumPaymentTotal('billAmt')).toBe(285);
        expect(sumPaymentTotal('tipPercent')).toBe(22);

        billAmtInput.value = 100;
        tipAmtInput.value = 37;

        submitPaymentInfo();

        expect(sumPaymentTotal('tipAmt')).toBe(99.7);
        expect(sumPaymentTotal('billAmt')).toBe(385);
        expect(sumPaymentTotal('tipPercent')).toBe(59);

    });

    it('add correct values to billing rows', function(){
        let currentBillList = document.querySelectorAll('#paymentTable tbody tr td');
        
        expect(currentBillList.length).toBe(4);
        expect(currentBillList[0].innerHTML).toBe('$285');
        expect(currentBillList[1].innerHTML).toBe('$62.7');
        expect(currentBillList[2].innerHTML).toBe('22%');
        expect(currentBillList[3].innerHTML).toBe('X');

    })

    it('should tip correct amount for one bill on tipPercent function', function(){
        expect(calculateTipPercent(285,62.7)).toBe(22);
        expect(calculateTipPercent(685,144.06)).toBe(21);
    });

    it('should add new td to a new tr', function(){
        let newTr = document.createElement('tr');

        appendTd(newTr,'testing');
        expect(newTr.children.length).toBe(1);
        expect(newTr.firstChild.innerHTML).toBe('testing');
    })

    it('should add a delete cell to a row in appendDeleteButton', function(){

        expect(paymentTbody.children[0].children.length).toEqual(4);
        expect(paymentTbody.children[0].children[3].innerHTML).toEqual("X");
        expect(paymentTbody.children[0].children[3].classList).toContain('removeTr');

        let newTr = document.createElement('tr');

        appendDeleteButton(newTr);
        expect(newTr.children.length).toBe(1);
        expect(newTr.firstChild.innerHTML).toBe('X');
    });

    afterEach( function(){
        billAmtInput.value = 0;
        tipAmtInput.value = 0;
        allPayments = {};
        paymentTbody.innerHTML = '';
        paymentId = 0;
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });

})