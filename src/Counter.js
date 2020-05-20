import React, { useState, useEffect } from 'react';

/* Read and Write value of the counter from and to local storage */
const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage).count;
  return { count: 0 };
};

const storeStateInLocalStorage = (count) => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
  console.log(localStorage);
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage());

  /* It's ok to combine these two; A tradeof between Performance vs Architecture & Testabilty */
  useEffect(() => {
    storeStateInLocalStorage(count);
  }, [count]);

  useEffect(() => {
    document.title = `Counter ${count}`;
  }, [count]);

  const increment = () =>
    setCount((c) => {
      if (c >= max) return c;
      return c + step;
    });
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <main className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  );
};

export default Counter;
