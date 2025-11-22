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
import type { AudioContent } from '../data/dailyContent';

interface RiseFlowProps {
    morningAffirmation: string;
    setMorningAffirmation: (affirmation: string) => void;
    goals: Goal[];
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
    setMorningEnergy: (energy: string) => void;
    setMorningEmotion: (emotion: string) => void;
    riseQuote: { quote: string; author: string };
    riseAudio: AudioContent;
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
    riseAudio,
    onShowProgress 
}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(true);
    };

    const getTodayDate = () => {
        return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    if (isCompleted) {
        return (
            <div className="text-center text-slate-700 animate-fade-in flex flex-col items-center justify-center min-h-[80vh]">
                 <div className="shooting-star" style={{ top: '10%', left: '-100px' }}></div>
                 <div className="shooting-star" style={{ top: '20%', left: '-150px', animationDelay: '1s' }}></div>
                <div className="p-6 rounded-full bg-white/30 mb-6 backdrop-blur-sm">
                    <GalaxyIcon className="w-16 h-16 text-slate-800" />
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">You’ve aligned your energy.</h2>
                <p className="text-xl text-slate-600 mb-8">Go forth with purpose and peace.</p>
                <button 
                    onClick={onShowProgress} 
                    className="px-8 py-3 rounded-full bg-white/40 hover:bg-white/60 text-slate-800 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    See your progress →
                </button>
            </div>
        );
    }
    
    return (
        <div className="max-w-5xl mx-auto pb-24 space-y-12">
            <header className="text-center animate-fade-in pt-4">
                <div className="inline-flex items-center justify-center p-4 bg-white/30 rounded-full mb-6 backdrop-blur-md shadow-sm">
                    <GalaxyIcon className="w-10 h-10 text-slate-800" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">Good Morning</h1>
                <p className="text-xl text-slate-600 font-medium mt-2">{getTodayDate()}</p>
            </header>

            {/* Section 1: Grounding */}
            <section className="space-y-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center space-x-4 mb-2 px-2">
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                     <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">1. Center Yourself</h2>
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-white/40 border-white/50 flex flex-col justify-center min-h-[320px]">
                        <div className="flex flex-col h-full justify-center">
                            <h3 className="text-center text-slate-800 font-semibold mb-6 opacity-80">Listen & Align</h3>
                            <AudioPlayer
                                title={riseAudio.title}
                                prompt={riseAudio.prompt}
                                duration={riseAudio.duration}
                                waveformColor="bg-slate-800"
                                buttonColor="bg-slate-800 text-soft-sand"
                                textColor="text-slate-800"
                            />
                        </div>
                    </Card>
                    
                    <BreathingCircle 
                        textColor="text-slate-800" 
                        className="bg-white/40 border-white/50 min-h-[320px]" 
                    />
                </div>
            </section>

            {/* Section 2: Mindset */}
            <section className="space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-4 mb-2 px-2">
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                     <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">2. Set Mindset</h2>
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <IntentionSetter
                        setMorningEnergy={setMorningEnergy}
                        setMorningEmotion={setMorningEmotion}
                        className="bg-white/40 border-white/50 h-full"
                    />

                     <AffirmationCarousel
                        currentAffirmation={morningAffirmation}
                        onAffirmationSelect={setMorningAffirmation}
                        textColor="text-slate-800"
                        className="bg-white/40 border-white/50 h-full flex flex-col justify-center"
                     />
                </div>
            </section>

            {/* Section 3: Focus & Action */}
            <section className="space-y-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
                 <div className="flex items-center space-x-4 mb-2 px-2">
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                     <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">3. Focus & Action</h2>
                     <div className="h-px bg-slate-800/20 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <GoalSetter 
                        goals={goals} 
                        setGoals={setGoals} 
                        textColor="text-slate-800" 
                        className="bg-white/40 border-white/50"
                     />
                     
                     <div className="flex flex-col h-full">
                        <QuoteCard
                            quote={riseQuote.quote}
                            author={riseQuote.author}
                            textColor="text-slate-800"
                            className="bg-white/40 border-white/50 h-full flex flex-col justify-center"
                        />
                     </div>
                </div>
            </section>

            <div className="text-center pt-8 animate-fade-in sticky bottom-8 z-10 pointer-events-none" style={{animationDelay: '0.4s'}}>
                <button 
                    onClick={handleComplete} 
                    className="pointer-events-auto px-10 py-4 text-lg font-bold text-slate-900 bg-white/90 backdrop-blur-xl border border-white/50 rounded-full shadow-xl hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center mx-auto"
                >
                    <span>Begin My Day</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">🌅</span>
                </button>
            </div>
        </div>
    );
};

export default RiseFlow;