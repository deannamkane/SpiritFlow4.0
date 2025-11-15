import React, { useState } from 'react';
import { MoonIcon } from '../components/icons';
import Card from '../components/Card';
import AudioPlayer from '../components/AudioPlayer';
import EveningReflection from '../components/EveningReflection';
import QuoteCard from '../components/QuoteCard';
import StarRating from '../components/StarRating';
import ProgressBar from '../components/ProgressBar';
import type { Goal } from '../App';

interface RestFlowProps {
    morningAffirmation: string;
    morningEnergy: string;
    morningEmotion: string;
    goals: Goal[];
    onToggleGoal: (index: number) => void;
    restQuote: { quote: string; author: string };
    setEveningVictory: (victory: string) => void;
    setEveningRelease: (release: string) => void;
}

const RestFlow: React.FC<RestFlowProps> = ({ 
    morningAffirmation, 
    morningEnergy, 
    morningEmotion, 
    goals, 
    onToggleGoal, 
    restQuote,
    setEveningVictory,
    setEveningRelease 
}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(true);
    };

    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    if (isCompleted) {
        return (
            <div className="text-center text-moonlight-silver animate-fade-in flex flex-col items-center justify-center min-h-[80vh]">
                <div className="shooting-star" style={{ top: '15%', left: '-100px', filter: 'drop-shadow(0 0 6px rgba(224, 229, 245, 0.7))' }}></div>
                <div className="shooting-star" style={{ top: '25%', left: '-150px', animationDelay: '1.2s', filter: 'drop-shadow(0 0 6px rgba(224, 229, 245, 0.7))' }}></div>
                <h2 className="text-4xl font-bold">The day is released.</h2>
                <p className="text-xl mt-4 opacity-80">Rest well.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 sm:space-y-12">
            <header className="text-center text-moonlight-silver animate-fade-in">
                <MoonIcon className="w-16 h-16 mx-auto" />
                <h1 className="text-3xl sm:text-4xl font-bold mt-4">Good Evening, Deanna 🌙</h1>
                <p className="text-xl opacity-80 mt-2">Reflect and release your day.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-8 sm:space-y-12">
                    <Card>
                        <AudioPlayer
                            title="Gratitude for the Small Wins"
                            prompt="Gratitude for the Small Wins. As the day comes to a close, let's take a moment to honor our journey. Breathe deeply, feeling the cool night air fill your lungs. Exhale, and let go of the day's hustle. Tonight, we celebrate the small wins. The quiet moments of progress that often go unnoticed. Perhaps it was a kind word you shared. A task you completed. A moment you chose patience over frustration. Each of these is a victory. A testament to your strength and grace. Let gratitude wash over you for these small, significant moments. They are the building blocks of a beautiful life. Acknowledge your effort. Honor your journey. You did well today. Now, release all that is left and drift into a peaceful, restorative rest."
                            duration="3:45"
                            waveformColor="bg-moonlight-silver/80"
                            buttonColor="bg-moonlight-silver/90 text-deep-indigo"
                            textColor="text-moonlight-silver"
                        />
                    </Card>
                    <EveningReflection
                        setEveningVictory={setEveningVictory}
                        setEveningRelease={setEveningRelease}
                    />
                    <QuoteCard
                        quote={restQuote.quote}
                        author={restQuote.author}
                        textColor="text-moonlight-silver"
                    />
                </div>
                <div className="space-y-8 sm:space-y-12">
                    <Card className="text-moonlight-silver">
                        <h3 className="text-xl font-bold text-center mb-4">Morning Intentions Recap</h3>
                        <div className="space-y-3 text-left">
                            <div>
                                <p className="font-semibold opacity-80">You placed your energy on:</p>
                                <p className="italic pl-2">{morningEnergy || "No intention set."}</p>
                            </div>
                            <div>
                                <p className="font-semibold opacity-80">You invited in the emotion of:</p>
                                <p className="italic pl-2">{morningEmotion || "No intention set."}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="text-moonlight-silver">
                        <h3 className="text-xl font-bold mb-2 text-center">Morning Affirmation Recap</h3>
                        <p className="text-center italic text-lg mb-4">"{morningAffirmation}"</p>
                        <p className="text-center mb-4 opacity-80">Did this feel true today?</p>
                        <StarRating />
                    </Card>

                    <Card className="text-moonlight-silver flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4">Goal Progress</h3>
                        <ProgressBar progress={progressPercentage} />
                        <div className="mt-6 w-full max-w-xs">
                            {goals.length > 0 ? (
                                <ul className="space-y-3 text-left">
                                    {goals.map((goal, index) => (
                                        <li key={index} className="flex items-center">
                                            <input 
                                                type="checkbox"
                                                id={`goal-${index}`}
                                                checked={goal.completed}
                                                onChange={() => onToggleGoal(index)}
                                                className="h-5 w-5 rounded bg-white/20 text-indigo-400 focus:ring-indigo-400 border-none"
                                            />
                                            <label 
                                                htmlFor={`goal-${index}`}
                                                className={`ml-3 cursor-pointer transition-opacity ${goal.completed ? 'opacity-50 line-through' : 'opacity-100'}`}
                                            >
                                                {goal.text}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center opacity-70">No goals set for today.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="text-center pt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <button onClick={handleComplete} className="px-8 py-4 text-xl font-bold text-deep-indigo bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300">
                    Release the Day 🌌
                </button>
            </div>
        </div>
    );
};

export default RestFlow;