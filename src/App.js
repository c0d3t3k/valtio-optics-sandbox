import React, { useEffect } from "react";
import { proxy, useProxy, subscribe } from "valtio";
import { subscribeKey } from "./subscribeKey";

// You wrap your state
const state = proxy({ value: 1 });

// You can freely mutate it from anywhere you want ...
state.nested = { ticks: 0 };
setInterval(() => state.nested.ticks++, 200);

function Figure() {
  const snapshot = useProxy(state);
  // This component *only* renders when state.number changes ...
  return <div className="figure">{snapshot.value}</div>;
}

function Ticks() {
  const snapshot = useProxy(state);
  // This component *only* renders when state.nested.ticks changes ...
  return <div className="ticks">{snapshot.nested.ticks} —</div>;
}

function Controls({ state: myState }) {
  const stateSnapshot = useProxy(myState);

  useEffect(() => {
    return subscribeKey(myState, "value", (value) =>
      console.log("Number Subscribe", value)
    );
  }, []);

  useEffect(() => {
    return subscribeKey(myState.nested, "ticks", (value) =>
      console.log("Ticks Subscribe", value)
    );
  }, []);

  // This component simply mutates the state model, just like that ...
  return (
    <div className="logo">
      <p>{stateSnapshot.value}</p>
      <svg viewBox="0 0 430 452" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          onClick={() => {
            myState.value++;
            // myState.subObj = [myState.subObj[0] + 1];
          }}
          d="M214.83 0.95459C82.4432 0.95459 0.0568237 91.2955 0.0568237 226.523C0.0568237 272.651 9.76549 313.624 27.8727 347.545L340.5 36.3569C306.7 13.5435 264.249 0.95459 214.83 0.95459Z"
          fill="#A5FFCE"
        />
      </svg>
      <svg viewBox="0 0 430 452" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          onClick={() => {
            myState.value--;
          }}
          d="M214.83 451.523C347.216 451.523 429.602 360.898 429.602 226.523C429.602 187.816 422.852 152.786 410.112 122.5L106 426.214C136.689 442.604 173.299 451.523 214.83 451.523Z"
          fill="#FFBEC2"
        />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Figure />
      <Ticks />
      <Controls state={state} />
    </>
  );
}
