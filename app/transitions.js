
var transitions = function() {
  return this.transition(
    this.fromRoute('dashboard'),
    this.toRoute('transactions'),
    this.use('toDown'),
    this.reverse('toUp')
  );
};

export default transitions
