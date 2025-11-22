import React from 'react';
import Card from './Card';

interface QuoteCardProps {
  quote: string;
  author: string;
  textColor: string;
  className?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, textColor, className }) => {
  return (
    <Card className={className || "bg-white/20"}>
      <blockquote className={`text-center ${textColor} flex flex-col h-full justify-center`}>
        <p className="text-xl italic leading-relaxed">“{quote}”</p>
        <cite className="block text-right not-italic mt-4 font-semibold opacity-80">— {author}</cite>
      </blockquote>
    </Card>
  );
};

export default QuoteCard;