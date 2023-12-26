'use client';

import HandCard from '@/types/card';
import { compact, set, times } from 'lodash';
import React from 'react';
import Card from './Card';
import { locations } from '@/contexts/PlayContext';
import Image from 'next/image';
import { DeckFull } from '@/types/deck';

const SetupPhase = ({
  cards,
  drawCard,
  suffleCardIntoDeck,
  setTiming,
  baseDeck,
  deckName,
  resources,
  setResources,
}: {
  cards: HandCard[];
  drawCard: (location: locations, count?: number) => void;
  suffleCardIntoDeck: (index: number | number[], source: locations) => void;
  setTiming: (timing: 'setup' | 'play') => void;
  deckName: string;
  resources: number;
  setResources: (resources: number) => void;
  baseDeck: DeckFull;
}) => {
  const [toMull, setToMull] = React.useState<Array<number>>([]);
  const [alreadyMull, setAlreadyMull] = React.useState<boolean>(false);
  const toggleMull = (index: number) => {
    if (toMull.includes(index)) {
      setToMull(toMull.filter((i) => i !== index));
    } else {
      setToMull([...toMull, index]);
    }
  };
  const mulligan = () => {
    setAlreadyMull(true);
    suffleCardIntoDeck(toMull, 'hand');
    drawCard('deck', toMull.length);
    setToMull([]);
  };
  return (
    <div>
      <Image
        src={`https://fr.arkhamdb.com${baseDeck.investigator.imagesrc}`}
        alt={baseDeck.investigator.name}
        width={500}
        height={1200}
        quality={100}
      />
      <h1>{deckName}</h1>
      <h2>{baseDeck.investigator.name}</h2>
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
      <section className="space-x-2">
        <button
          onClick={() => {
            drawCard('deck', 5);
          }}
        >
          Draw starting hand
        </button>
        <button onClick={() => drawCard('deck')}>Draw one card</button>
        {!alreadyMull && <button onClick={mulligan}>Mulligan</button>}
        <button onClick={() => setTiming('play')}>End</button>
      </section>
      <section>
        <h2>Hand</h2>
        <ul className="space-y-2 mx-auto w-80">
          {cards?.map((card, index) => (
            <li key={card.name}>
              <Card
                card={card}
                actions={compact([
                  {
                    name: 'Shuffle',
                    click: () => suffleCardIntoDeck(index, 'hand'),
                  },
                  !alreadyMull && {
                    name: 'Mull',
                    click: () => toggleMull(index),
                  },
                ])}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SetupPhase;
