const CircuitBreaker = require('opossum');

function asyncFunctionThatCouldFail(x, y) {
  return new Promise((resolve, reject) => {
    // Do something, maybe on the network or a disk
  });
}

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};
const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);

breaker.fire(x, y)
  .then(console.log)
  .catch(console.error);

  const breakerFallback = new CircuitBreaker(asyncFunctionThatCouldFail, options);
// if asyncFunctionThatCouldFail starts to fail, firing the breaker
// will trigger our fallback function
breakerFallback.fallback(() => 'Sorry, out of service right now');
breakerFallback.on('fallback', (result) => reportFallbackEvent(result));

// const delay = (delay, a, b, c) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });

// const breaker = new CircuitBreaker(delay);
// breaker.fire(20000, 1, 2, 3);
// breaker.fallback((delay, a, b, c) => `Sorry, out of service right now. But your parameters are: ${delay}, ${a}, ${b} and ${c}`);