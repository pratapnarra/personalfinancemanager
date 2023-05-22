import React, { useEffect, useRef } from 'react';
import WaveObj from '../src/utils/Wave';

const Wave = () => {
  const canvasRef = useRef(null);
  let frequency = 0.023;
  const waves = {
    frontWave: new WaveObj([0.0311, 0.028, 0.015], 'rgb(24, 90, 219, 0.4)'),
    backWave: new WaveObj([0.0122, 0.028, 0.005], 'rgb(62, 120, 237, 0.1)'),
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      Object.entries(waves).forEach(([, wave]) => {
        wave.draw(context, canvas.width, canvas.height, frequency);
      });
      frequency += 0.023;
      requestAnimationFrame(render);
    };
    render();
  }, [waves]);

  return <canvas ref={canvasRef} width="1300" height="600" />;
};

export default Wave;
