import './App.css';
import { useState, useRef, useEffect, useCallback } from 'react';

function App() {
  let [state, setState] = useState('Neutral');
  // const animationStates = ['Idle', 'Jump', 'Fall', 'Run', 'Dizzy', 'Sit', 'Roll', "Bite", "KO", "GetHit"];
  const animationStates = ['Neutral', 'Happy', 'Sad'];

  return (
    <div className="App" onChange={({target: {value}}) => {setState(value)}}>
      <select>
        {animationStates.map((element, index) => <option key={index} value={element}>{element}</option>)}
      </select>
      <h1>{state}</h1>
      {/* <Canvas state={state} gameFrame={0} stagger={4} canvasWidth={600} canvasHeight={600} spriteWidth={575} spriteHeight={523} imageFile="./shadow_dog.png" /> */}
      <Canvas state={state} gameFrame={0} stagger={6} canvasWidth={300} canvasHeight={300} spriteWidth={300} spriteHeight={300} imageFile="./Astro_spritesheet3.png" />

    </div>
  );
}

function Canvas({state, gameFrame, stagger, canvasWidth, canvasHeight, spriteWidth, spriteHeight, imageFile}) {
  // const states = [{name: "idle",frames: 7,},{name: "jump",frames: 7,},{name: "fall",frames: 7,},{name: "run",frames: 9,},{name: "dizzy",frames: 11,},{name: "sit",frames: 5,},{name: "roll",frames: 7,},{name: "bite",frames: 7,},{name: "ko",frames: 12,},{name: "getHit",frames: 4,},];
  const states = [{name: "neutral",frames: 35,},{name: "happy",frames: 35,},{name: "sad",frames: 35,},];
  const canvasRef = useRef(null);
  const image = new Image();
  image.src = require(`${imageFile}`);

  function getStateIndex() {
    for (let s of states) {
      if (s.name == state.toString().toLowerCase()) {
        return states.indexOf(s);
  }}}

  function animate() {
    console.log(state);
    let stateIndex = getStateIndex();
    const frames = states[stateIndex].frames;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const y = spriteHeight * stateIndex;
    const x = spriteWidth * (Math.floor(gameFrame / stagger) % frames);
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(image, x, y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
  };

  useEffect(() => animate(), [state])
  
  return (
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
  );
}

export default App;