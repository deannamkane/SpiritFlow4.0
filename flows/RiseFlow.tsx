import React, { useState } from 'react';
import { GalaxyIcon } from '../components/icons';
import Card from '../components/Card';
import AudioPlayer from '../components/AudioPlayer';
import QuoteCard from '../components/QuoteCard';
import AffirmationCarousel from '../components/AffirmationCarousel';
import BreathingCircle from '../components/BreathingCircle';
import GoalSetter from '../components/GoalSetter';
import IntentionSetter from '../components/IntentionSetter';
import type { Goal } from '../App';

interface RiseFlowProps {
    morningAffirmation: string;
    setMorningAffirmation: (affirmation: string) => void;
    goals: Goal[];
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
    setMorningEnergy: (energy: string) => void;
    setMorningEmotion: (emotion: string) => void;
    riseQuote: { quote: string; author: string };
    onShowProgress: () => void;
}

const RiseFlow: React.FC<RiseFlowProps> = ({ 
    morningAffirmation, 
    setMorningAffirmation, 
    goals, 
    setGoals, 
    setMorningEnergy,
    setMorningEmotion,
    riseQuote,
    onShowProgress 
}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(true);
    };

    if (isCompleted) {
        return (
            <div className="text-center text-slate-700 animate-fade-in flex flex-col items-center justify-center min-h-[80vh]">
                 <div className="shooting-star" style={{ top: '10%', left: '-100px' }}></div>
                 <div className="shooting-star" style={{ top: '20%', left: '-150px', animationDelay: '1s' }}></div>
                <h2 className="text-4xl font-bold">You’ve aligned your energy for today.</h2>
                <button onClick={onShowProgress} className="text-xl mt-4 opacity-80 cursor-pointer hover:opacity-100 transition">See your progress →</button>
            </div>
        );
    }
    
    return (
        <div className="space-y-8 sm:space-y-12">
            <header className="text-center animate-fade-in">
                <GalaxyIcon className="w-16 h-16 mx-auto text-slate-700/80" />
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-4">Good Morning, Deanna ☀️</h1>
                <p className="text-xl text-slate-700 mt-2">Start your Rise Flow</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-8 sm:space-y-12">
                    <Card>
                        <AudioPlayer
                            title="Energy Follows Attention"
                            prompt="Energy Follows Attention. Take a deep breath in, and as you exhale, release any tension. Let's begin by bringing your awareness to this present moment. Notice the subtle sensations in your body. The gentle rhythm of your breath. Today, we focus on a simple truth: where your attention goes, your energy flows. Imagine your attention as a beam of golden light. You can direct this light wherever you choose. Will you focus it on worry, on doubt? Or will you shine it on gratitude, on possibility, on the love that surrounds you? You have the power to choose. Place your energy on what you wish to grow. Focus on your strength. On your peace. On your joy. Feel that energy expand within you, filling you with warmth and purpose. Carry this light with you throughout your day."
                            duration="2:13"
                            waveformColor="bg-golden-sun"
                            buttonColor="bg-golden-sun text-slate-800"
                            textColor="text-slate-800"
                        />
                    </Card>

                    <IntentionSetter
                        setMorningEnergy={setMorningEnergy}
                        setMorningEmotion={setMorningEmotion}
                    />

                    <QuoteCard
                        quote={riseQuote.quote}
                        author={riseQuote.author}
                        textColor="text-slate-800"
                    />
                </div>
                <div className="space-y-8 sm:space-y-12">
                     <AffirmationCarousel
                        currentAffirmation={morningAffirmation}
                        onAffirmationSelect={setMorningAffirmation}
                        textColor="text-slate-800"
                     />
                     <GoalSetter goals={goals} setGoals={setGoals} textColor="text-slate-800" />
                     <BreathingCircle textColor="text-slate-700" />
                </div>
            </div>

            <div className="text-center pt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <button onClick={handleComplete} className="px-8 py-4 text-xl font-bold text-slate-800 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300">
                    Complete Morning Flow 🌅
                </button>
            </div>
        </div>
    );
};

export default RiseFlow;