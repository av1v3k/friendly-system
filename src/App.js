import { useState, useEffect } from "react";
import "./App.css";

import Calendar from "./Components/Calendar";

const style = {
  position: "relative",
  margin: "50px auto",
};

function App() {
  return (
    <div className="App">
      <Calendar style={style}></Calendar>
    </div>
  );
}

export default App;
