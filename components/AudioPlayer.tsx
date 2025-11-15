import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, SpinnerIcon } from './icons';
import { GoogleGenAI, Modality } from "@google/genai";

// --- Audio Decoding Helpers from Gemini Docs ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Component ---

interface AudioPlayerProps {
  title: string;
  prompt: string;
  duration: string;
  waveformColor: string;
  buttonColor: string;
  textColor: string;
}

const WaveformBar: React.FC<{ height: number; color: string; delay: number; isPlaying: boolean }> = ({ height, color, delay, isPlaying }) => (
  <div
    className={`w-1 rounded-full ${color} transition-transform duration-500`}
    style={{ 
      height: `${height}px`, 
      animation: isPlaying ? `wave 1.5s ease-in-out infinite ${delay}s` : 'none'
    }}
  >
    <style>{`
      @keyframes wave {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
      }
    `}</style>
  </div>
);

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, prompt, duration, waveformColor, buttonColor, textColor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const heights = [20, 30, 25, 35, 22, 28, 32, 26, 20, 30, 25, 35, 22, 28, 32, 26, 20, 30, 25, 35, 22, 28, 32, 26];
  
  const stopAudio = () => {
    if (sourceRef.current) {
        sourceRef.current.onended = null; // Important to prevent recursive call
        try {
          sourceRef.current.stop();
        } catch(e) { console.warn("Audio source already stopped:", e); }
        sourceRef.current = null;
    }
    setIsPlaying(false);
  };
  
  const playAudio = async () => {
    if (!audioContextRef.current || !audioBufferRef.current) return;
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    // Stop any existing audio before playing new one
    stopAudio();

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => {
      // Check if this source is still the current one before setting state
      if (sourceRef.current === source) {
        setIsPlaying(false);
        sourceRef.current = null;
      }
    };
    
    source.start(0);
    sourceRef.current = source;
    setIsPlaying(true);
  };

  const handleTogglePlay = async () => {
    if (isLoading) return;

    // Check if the API key is configured, especially for deployed environments.
    if (!process.env.API_KEY) {
      alert("API Key is not configured. Please set up your environment variables for the deployment.");
      console.error("API_KEY environment variable is missing.");
      return;
    }
    
    // Initialize AudioContext on first user gesture.
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      } catch (e) {
        console.error("AudioContext could not be created:", e);
        alert("Your browser does not support the necessary audio features.");
        return;
      }
    }
    
    if (isPlaying) {
      stopAudio();
    } else {
      if (audioBufferRef.current) {
        playAudio();
      } else {
        setIsLoading(true);
        try {
          const ai = new GoogleGenAI({apiKey: process.env.API_KEY as string});
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say with a calm, gentle, and reassuring voice: ${prompt}` }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
              },
            },
          });

          const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (base64Audio && audioContextRef.current) {
            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
            audioBufferRef.current = audioBuffer;
            playAudio();
          } else {
             throw new Error("No audio data received from API.");
          }
        } catch (error) {
          console.error("Failed to generate audio:", error);
          alert("Sorry, there was an error generating the audio. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);


  return (
    <div className={`flex items-center space-x-4 ${textColor}`}>
      <button
        onClick={handleTogglePlay}
        disabled={isLoading}
        className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed ${buttonColor}`}
      >
        {isLoading ? <SpinnerIcon className="w-7 h-7" /> : 
         isPlaying ? <PauseIcon className="w-7 h-7" /> : 
         <PlayIcon className="w-7 h-7" />}
      </button>
      <div className="flex-grow">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex items-end space-x-1 h-10">
            {heights.map((h, i) => (
              <WaveformBar key={i} height={h} color={waveformColor} delay={i * 0.1} isPlaying={isPlaying} />
            ))}
          </div>
        </div>
      </div>
      <span className="font-semibold text-lg">{duration}</span>
    </div>
  );
};

export default AudioPlayer;