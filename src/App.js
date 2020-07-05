import React, { Fragment } from "react";
import candlestickSeries from "./component/chart";
import "./App.css";

function App() {
  return (
    <Fragment>
      <div className="App">
        <h2 className="title">Bitcoin Trading Chart</h2>
        <candlestickSeries />
      </div>
    </Fragment>
  );
}

export default App;
