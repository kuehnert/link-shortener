import React from "react";
import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
};

export default App;
