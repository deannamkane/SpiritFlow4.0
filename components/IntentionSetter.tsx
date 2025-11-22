import React, { useState } from 'react';
import Card from './Card';

interface IntentionSetterProps {
    setMorningEnergy: (energy: string) => void;
    setMorningEmotion: (emotion: string) => void;
    className?: string;
}

const IntentionPrompt: React.FC<{
    prompt: string, 
    onSet: (value: string) => void
}> = ({ prompt, onSet }) => {
    const [value, setValue] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    const handleSet = () => {
        if (value.trim()) {
            onSet(value);
            setIsLocked(true);
        }
    };

    const handleEdit = () => {
        setIsLocked(false);
    }

    return (
        <div>
            <label className="block text-lg font-semibold mb-2 text-slate-800">{prompt}</label>
            {isLocked ? (
                <div className="flex items-center justify-between bg-white/30 rounded-lg p-3 border border-white/20">
                    <p className="italic text-slate-800 font-medium">{value}</p>
                    <button onClick={handleEdit} className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors">Edit</button>
                </div>
            ) : (
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="I will focus on..."
                        className="w-full bg-white/40 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-400/50 transition-all duration-300 placeholder-slate-500 text-slate-800"
                    />
                    <button 
                        onClick={handleSet}
                        disabled={!value.trim()}
                        className="px-4 py-2 rounded-lg bg-golden-sun text-slate-800 font-bold hover:brightness-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        Set
                    </button>
                </div>
            )}
        </div>
    );
}


const IntentionSetter: React.FC<IntentionSetterProps> = ({ setMorningEnergy, setMorningEmotion, className }) => {
  return (
    <Card className={className || "bg-soft-pink"}>
      <div className="space-y-6">
        <IntentionPrompt 
            prompt="Where will I place my energy?"
            onSet={setMorningEnergy}
        />
        <IntentionPrompt 
            prompt="What emotion will I invite in?"
            onSet={setMorningEmotion}
        />
      </div>
    </Card>
  );
};

export default IntentionSetter;