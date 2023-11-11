import HandCard from '@/types/card';
import React from 'react';

const Card = ({ card, className }: { card: HandCard; className?: string }) => {
  return (
    <span className={`${className} text-${card.faction_code}`}>
      {card.name}
    </span>
  );
};

export default Card;
