import React, { useState, useEffect } from 'react';
import Card from './Card';

interface AffirmationCarouselProps {
  currentAffirmation: string;
  onAffirmationSelect: (affirmation: string) => void;
  textColor: string;
  className?: string;
}

const affirmations = [
  "I am focused, calm, and ready to receive.",
  "I move gently and bravely into the day.",
  "My energy is aligned with my purpose.",
];

const AffirmationCarousel: React.FC<AffirmationCarouselProps> = ({ currentAffirmation, onAffirmationSelect, textColor, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isWritingOwn, setIsWritingOwn] = useState(false);
  const [customAffirmation, setCustomAffirmation] = useState("");

  const handleSelect = (affirmation: string) => {
    onAffirmationSelect(affirmation);
    setIsEditing(false);
  };

  const handleSaveCustom = () => {
    if (customAffirmation.trim()) {
      onAffirmationSelect(customAffirmation.trim());
      setIsEditing(false);
      setIsWritingOwn(false);
      setCustomAffirmation("");
    }
  };

  const nextAffirmation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % affirmations.length);
  };
  
  const prevAffirmation = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + affirmations.length) % affirmations.length);
  };

  const handleWriteOwnClick = () => {
    setIsWritingOwn(true);
    if (!affirmations.includes(currentAffirmation)) {
        setCustomAffirmation(currentAffirmation);
    }
  }

  const handleCancelWriteOwn = () => {
    setIsWritingOwn(false);
    setCustomAffirmation("");
  }

  useEffect(() => {
    const index = affirmations.indexOf(currentAffirmation);
    if (index !== -1) {
        setCurrentIndex(index);
    }
  }, [currentAffirmation]);

  if (!isEditing) {
    return (
      <Card className={`text-center ${className || ''}`}>
        <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Today's Affirmation</h3>
        <div className="relative flex items-center justify-center h-24 px-4">
          <p className={`text-2xl italic font-medium ${textColor}`}>"{currentAffirmation}"</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)} 
          className="mt-4 px-4 py-2 rounded-full bg-slate-800/5 hover:bg-slate-800/10 text-slate-700 transition-colors text-sm font-semibold">
          Change ✍️
        </button>
      </Card>
    );
  }

  return (
    <Card className={`text-center ${className || ''}`}>
      <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Choose Your Affirmation</h3>
      
      {isWritingOwn ? (
        <div className="space-y-4">
          <textarea
            value={customAffirmation}
            onChange={(e) => setCustomAffirmation(e.target.value)}
            placeholder="I am..."
            rows={3}
            className="w-full bg-white/40 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400/50 transition-all duration-300 resize-none placeholder-slate-500 text-slate-800"
          />
          <div className="flex justify-center space-x-4">
            <button onClick={handleCancelWriteOwn} className="px-4 py-2 rounded-lg bg-white/30 text-slate-700 hover:bg-white/50 transition">Cancel</button>
            <button onClick={handleSaveCustom} className="px-4 py-2 rounded-lg bg-golden-sun text-slate-800 font-bold hover:brightness-110 active:scale-95 transition-transform">Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center h-24 px-4">
            <p className={`text-xl italic ${textColor}`}>"{affirmations[currentIndex]}"</p>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button onClick={prevAffirmation} className="px-3 py-1 rounded-md bg-slate-800/5 hover:bg-slate-800/10 text-slate-700 transition">&lt;</button>
            <button onClick={() => handleSelect(affirmations[currentIndex])} className="px-4 py-2 rounded-lg bg-golden-sun text-slate-800 font-bold hover:brightness-110 active:scale-95 transition-transform shadow-sm">Select</button>
            <button onClick={nextAffirmation} className="px-3 py-1 rounded-md bg-slate-800/5 hover:bg-slate-800/10 text-slate-700 transition">&gt;</button>
          </div>
          <button onClick={handleWriteOwnClick} className={`mt-4 ${textColor} opacity-70 hover:opacity-100 transition-opacity text-sm underline decoration-dotted underline-offset-4`}>Write my own ✍️</button>
        </>
      )}
    </Card>
  );
};

export default AffirmationCarousel;