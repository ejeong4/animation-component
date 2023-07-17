import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  let [state, setState] = useState('Idle');
  const animationStates = ['Idle', 'Jump', 'Fall', 'Run', 'Dizzy', 'Sit', 'Roll', "Bite", "KO", "GetHit"];

  return (
    <div className="App" onChange={({target: {value}}) => setState(value)}>
      <select>
        {animationStates.map((element, index) => <option key={index} value={element}>{element}</option>)}
      </select>
      <Canvas state={state}/>
    </div>
  );
}

function Canvas({state}) {
  const states = [{name: "idle",frames: 7,},{name: "jump",frames: 7,},{name: "fall",frames: 7,},{name: "run",frames: 9,},{name: "dizzy",frames: 11,},{name: "sit",frames: 5,},{name: "roll",frames: 7,},{name: "bite",frames: 7,},{name: "ko",frames: 12,},{name: "getHit",frames: 4,},];
  
  const canvasRef = useRef(null);
  
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
    requestAnimationFrame(() => animate(state));
  }

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);
  
  return (
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
  );
}

export default App;