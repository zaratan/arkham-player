'use client';

import React, { useContext } from 'react';
import Card from './Card';
import Image from 'next/image';
import PlayContext from '@/contexts/PlayContext';

const Play = () => {
  const {
    baseDeck,
    deckName,
    resources,
    setResources,
    drawCard,
    currentDeck,
    hand,
    inPlay,
    discard,
    exiled,
    inSearch,
    playCard,
    discardCard,
    getCardFromDiscard,
    getCardFromSearch,
    search,
    clearSearch,
  } = useContext(PlayContext);

  if (!baseDeck) {
    return <div>Deck not found</div>;
  }

  if (!currentDeck || !resources) {
    return <div>Loading...</div>;
  }

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
      <ul>
        {baseDeck.cards.map((cardItem) => (
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
        <button className="inline px-2 text-xl" onClick={drawCard}>
          Draw
        </button>
        <button className="inline px-2 text-xl" onClick={() => search(1)}>
          Search
        </button>
      </p>
      <section>
        <h2>Hand</h2>
        <ul>
          {hand?.map((card, index) => (
            <li key={card.name}>
              <Card card={card} className="pr-2" />
              <span
                className="inline px-2 text-xl"
                onClick={() => playCard(index, 'hand')}
              >
                Play
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>In play</h2>
        <ul>
          {inPlay?.map((card, index) => (
            <li key={card.name}>
              <Card card={card} className="pr-2" />
              <span
                className="inline px-2 text-xl"
                onClick={() => discardCard(index, 'play')}
              >
                Discard
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Discard</h2>
        <ul>
          {discard?.map((card, index) => (
            <li key={card.name}>
              <Card card={card} className="pr-2" />
              <span
                className="inline px-2 text-xl"
                onClick={() => getCardFromDiscard(index)}
              >
                Draw
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Exiled</h2>
        <ul>
          {exiled?.map((card, index) => (
            <li key={card.name}>
              <Card card={card} className="pr-2" />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Search</h2>
        <ul>
          {inSearch?.map((card, index) => (
            <li key={card.name}>
              <Card card={card} className="pr-2" />
              <span
                className="inline px-2 text-xl"
                onClick={() => getCardFromSearch(index)}
              >
                Draw
              </span>
            </li>
          ))}
        </ul>
        <button
          className="inline px-2 text-xl"
          onClick={() => clearSearch('shuffle')}
        >
          Clear
        </button>
      </section>
    </div>
  );
};

export default Play;
