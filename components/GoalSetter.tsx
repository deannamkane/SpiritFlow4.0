import React, { useState } from 'react';
import Card from './Card';
import { XMarkIcon } from './icons';
import type { Goal } from '../App';

interface GoalSetterProps {
    goals: Goal[];
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
    textColor: string;
    className?: string;
}

const GoalSetter: React.FC<GoalSetterProps> = ({ goals, setGoals, textColor, className }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && goals.length < 5) {
            setGoals([...goals, { text: inputValue.trim(), completed: false }]);
            setInputValue('');
        }
    };

    const handleRemoveGoal = (indexToRemove: number) => {
        setGoals(goals.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Card className={className}>
            <h3 className={`text-xl font-bold mb-4 text-center ${textColor}`}>Today's Goals</h3>
            <form onSubmit={handleAddGoal} className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new goal..."
                    className="w-full bg-white/40 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-400/50 transition-all duration-300 placeholder-slate-500 text-slate-800"
                />
                <button 
                    type="submit" 
                    className="px-4 py-2 rounded-lg bg-golden-sun text-slate-800 font-bold hover:brightness-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    disabled={!inputValue.trim()}
                >
                    Add
                </button>
            </form>
            <div className="space-y-2">
                {goals.length === 0 && <p className="text-center text-slate-500 italic opacity-70 py-4">What do you want to achieve today?</p>}
                {goals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/40 p-3 rounded-md border border-white/20 animate-fade-in">
                        <span className={`${textColor} font-medium`}>{goal.text}</span>
                        <button onClick={() => handleRemoveGoal(index)} className="text-slate-500 hover:text-red-500 transition-colors">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default GoalSetter;