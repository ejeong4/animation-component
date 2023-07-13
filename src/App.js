import './App.css';
import { useState, useRef, useEffect } from 'react';
import { indexOf } from 'lodash';
// import { getIn } from 'immutable';

function App() {
  return (
    <div className="App">
      <AnimationComponent />
    </div>
  );
}

function AnimationComponent() {
  let [state, setState] = useState('Idle');

  function handleChange(event) {
    console.log("selected, prevstate: " + state);
    setState(event.target.value);
  }

  console.log("current state: " + state);
  return(
    <div onChange={handleChange} >
      <Dropdown />
      <Canvas state={state}/>
    </div>
  );
}

function Canvas({state}) {
  console.log("inside canvas, state is " + state);

  const states = [{name: "idle",frames: 7,},{name: "jump",frames: 7,},{name: "fall",frames: 7,},{name: "run",frames: 9,},{name: "dizzy",frames: 11,},{name: "sit",frames: 5,},{name: "roll",frames: 7,},{name: "bite",frames: 7,},{name: "ko",frames: 12,},{name: "getHit",frames: 4,},];
  
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  const canvasWidth = 600;
  const canvasHeight = 600;
  const spriteWidth = 575;
  const spriteHeight = 523;
  const image = new Image();

  image.src = require("./shadow_dog.png");
  let gameFrame = 0;

  function getStateIndex() {
    for (let s of states) {
      if (s.name == state.toString().toLowerCase()) {
        return states.indexOf(s);
      }
    }
  }

  function animate() {
    console.log("animating " + state);
    const stateIndex = getStateIndex();
    const frames = states[stateIndex].frames;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stagger = 5;
    const y = spriteHeight * stateIndex;
    const x = spriteWidth * (Math.floor(gameFrame / stagger) % frames);
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(image, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestRef.current = requestAnimationFrame(() => animate(state));
  }

  useEffect(() => {
    requestAnimationFrame(animate);
    // return () => cancelAnimationFrame(requestRef.current);
  }, []);
  
  

  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
      <h3>current state: {state}</h3>
    </div>
  );
}

function Dropdown({}) {
  return (
        <select>
          <DropdownItem value="Idle" />
          <DropdownItem value="Jump" />
        </select>
  );
}

function DropdownItem({value}) {
  return (
      <option>{value}</option>
  );
}

export default App;