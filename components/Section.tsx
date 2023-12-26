import { locations } from '@/contexts/PlayContext';
import HandCard from '@/types/card';
import React from 'react';
import Card from './Card';
import { compact } from 'lodash';

const Section = ({
  title,
  cards,
  playCard,
  discardCard,
  location,
  playable,
  discardable,
}: {
  title: string;
  cards: HandCard[];
  playCard: (source: locations, index: number) => void;
  discardCard: (source: locations, index: number) => void;
  location: locations;
  playable?: boolean;
  discardable?: boolean;
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="space-y-2">
        {cards?.map((card, index) => (
          <li key={card.name}>
            <Card
              card={card}
              actions={compact([
                playable &&
                  !card.permanent && {
                    name: 'Play',
                    click: () => playCard(location, index),
                  },
                discardable &&
                  !card.permanent && {
                    name: 'Disc',
                    click: () => discardCard(location, index),
                  },
              ])}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section;
