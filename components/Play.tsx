'use client';

import { DeckFull } from '@/types/deck';
import React from 'react';
import Card from './Card';
import Image from 'next/image';

const Play = ({ deck }: { deck: DeckFull }) => {
  const [deckCards, setDeckCards] = React.useState(deck.cards);
  const [handCards, setHandCards] = React.useState([]);
  const [discardCards, setDiscardCards] = React.useState([]);
  const [exileCards, setExileCards] = React.useState([]);
  const [playCards, setPlayCards] = React.useState([]);
  const [resources, setResources] = React.useState(5);

  return (
    <div>
      <Image
        src={`https://fr.arkhamdb.com${deck.investigator.imagesrc}`}
        alt={deck.investigator.name}
        width={500}
        height={1200}
        quality={100}
      />
      <h1>{deck.name}</h1>
      <h2>{deck.investigator.name}</h2>
      <ul>
        {deckCards.map((cardItem) => (
          <li key={cardItem.card.code}>
            <Card card={cardItem.card} className="pr-2" />x {cardItem.count}
          </li>
        ))}
      </ul>
      <p>
        Ressources: {resources}{' '}
        <button
          className="inline px-2 text-xl"
          onClick={() => setResources(Math.max(resources - 1, 0))}
        >
          -
        </button>
        <button
          className="inline px-2 text-xl"
          onClick={() => setResources(Math.max(resources + 1, 0))}
        >
          +
        </button>
      </p>
    </div>
  );
};

export default Play;
