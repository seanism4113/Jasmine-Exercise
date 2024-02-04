
describe('Determine monthly rate test', function(){
  it('should calculate the monthly rate correctly', function () {
    const values = {amount: 10000, years: 3, rate: 5};
    expect(calculateMonthlyPayment(values)).toBe('299.71');
  });
    it("should return a result with 2 decimal places", function() {
      const values2 = {amount: 500000, years: 10, rate: 12.676};
      expect(calculateMonthlyPayment(values2)).toBe('7370.29');
  });
})


 