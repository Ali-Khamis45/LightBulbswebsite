export const playSwitchSound = (isTurningOn) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // 1. Plastic friction click (High-frequency noise burst)
    const bufferSize = ctx.sampleRate * 0.02; // 20ms burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = isTurningOn ? 2400 : 1900;
    noiseFilter.Q.value = 6;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    // 2. Physical latch resonance (Sine wave frequency sweep)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    const startFreq = isTurningOn ? 250 : 200;
    const endFreq = isTurningOn ? 100 : 80;
    const duration = isTurningOn ? 0.06 : 0.08;
    
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    
    oscGain.gain.setValueAtTime(isTurningOn ? 0.12 : 0.15, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    // Play both sound components
    noise.start();
    osc.start();
    
    // Schedule stop to clean up active audio nodes
    noise.stop(ctx.currentTime + 0.02);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Synthesized click failed (user interaction required first):", e);
  }
};
