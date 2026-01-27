/**
 * Reusable AudioWorklet for streaming PCM16 audio playback.
 * Place in public/ folder and load via audioContext.audioWorklet.addModule()
 */
class RingBuffer {
  constructor(initialCapacity) {
    this.capacity = initialCapacity;
    this.buffer = new Float32Array(initialCapacity);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.availableData = 0;
  }

  push(data) {
    const len = data.length;
    // Auto-grow if needed
    while (this.availableData + len > this.capacity) {
      this.grow();
    }
    for (let i = 0; i < len; i++) {
      this.buffer[this.writeIndex] = data[i];
      this.writeIndex = (this.writeIndex + 1) % this.capacity;
      this.availableData++;
    }
  }

  grow() {
    const newCapacity = this.capacity * 2;
    const newBuffer = new Float32Array(newCapacity);
    // Copy existing data maintaining order
    for (let i = 0; i < this.availableData; i++) {
      const srcIndex = (this.readIndex + i) % this.capacity;
      newBuffer[i] = this.buffer[srcIndex];
    }
    this.buffer = newBuffer;
    this.readIndex = 0;
    this.writeIndex = this.availableData;
    this.capacity = newCapacity;
  }

  pull(outputBuffer) {
    const len = outputBuffer.length;
    const available = Math.min(len, this.availableData);
    for (let i = 0; i < available; i++) {
      outputBuffer[i] = this.buffer[this.readIndex];
      this.readIndex = (this.readIndex + 1) % this.capacity;
    }
    // Pad remaining with silence
    for (let i = available; i < len; i++) {
      outputBuffer[i] = 0;
    }
    this.availableData -= available;
    return available > 0;
  }

  available() {
    return this.availableData;
  }

  clear() {
    this.readIndex = 0;
    this.writeIndex = 0;
    this.availableData = 0;
  }
}

class AudioPlaybackProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ringBuffer = new RingBuffer(24000 * 30); // 30s initial capacity
    this.isPlaying = false;
    this.streamComplete = false;

    this.port.onmessage = (event) => {
      const { type, samples } = event.data;
      if (type === "audio") {
        this.ringBuffer.push(samples);
        this.isPlaying = true;
      } else if (type === "clear") {
        this.ringBuffer.clear();
        this.isPlaying = false;
        this.streamComplete = false;
      } else if (type === "streamComplete") {
        this.streamComplete = true;
      } else if (type === "stop") {
        this.isPlaying = false;
        this.streamComplete = false;
      }
    };
  }

  process(inputs, outputs) {
    const output = outputs[0];
    if (!output || output.length === 0) return true;

    const channel = output[0];
    if (this.isPlaying) {
      this.ringBuffer.pull(channel);
      if (this.streamComplete && this.ringBuffer.available() === 0) {
        this.isPlaying = false;
        this.streamComplete = false;
        this.port.postMessage({ type: "ended" });
      }
    } else {
      channel.fill(0);
    }
    return true;
  }
}

registerProcessor("audio-playback-processor", AudioPlaybackProcessor);

