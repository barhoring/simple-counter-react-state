import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(
      (state, props) => {
        const { count } = state;
        const { max, step } = props;
        if (count >= max) return;
        return { count: count + step };
      },
      () => {
        console.log('after:', this.state);
        document.title = `Counter ${this.state.count}`;
        localStorage.setItem('counterState', JSON.stringify(this.state));
      },
    );
    console.log('before:', this.state);
  }

  decrement() {
    this.setState(({ count }) => ({
      count: count - 1,
    }));
  }

  reset() {
    this.setState(({ count }) => ({
      count: 0,
    }));
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
