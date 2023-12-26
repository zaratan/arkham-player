'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import PlayContext from '@/contexts/PlayContext';
import Section from './Section';
import SetupPhase from './SetupPhase';

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
    visibleSections,
    toggleSection,
    search,
    clearSearch,
    exileCard,
    shuffleBack,
    shuffleCardIntoDeck,
    getCard,
    setExtraName,
    shuffle,
    moveCardInto,
    setTiming,
    timing,
  } = useContext(PlayContext);

  if (!baseDeck) {
    return <div>Deck not found</div>;
  }

  if (!currentDeck || !resources) {
    return <div>Loading...</div>;
  }

  if (timing === 'setup') {
    return (
      <SetupPhase
        baseDeck={baseDeck}
        deckName={deckName || ''}
        resources={resources}
        setResources={setResources}
        drawCard={drawCard}
        suffleCardIntoDeck={shuffleCardIntoDeck}
        setTiming={setTiming}
        cards={hand || []}
      />
    );
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
        <button
          className="inline px-2 text-xl"
          onClick={() => drawCard('deck')}
        >
          Draw
        </button>
        <button className="inline px-2 text-xl" onClick={() => search(1)}>
          Search
        </button>
      </p>
      <div className="flex justify-between px-4">
        {visibleSections?.hand && hand && (
          <Section
            title="Hand"
            cards={hand}
            playCard={playCard}
            discardCard={discardCard}
            location="hand"
            playable
            discardable
          />
        )}
        {visibleSections?.play && inPlay && (
          <Section
            title="In Play"
            cards={inPlay}
            playCard={playCard}
            discardCard={discardCard}
            location="play"
            discardable
          />
        )}
        {visibleSections?.discard && discard && (
          <Section
            title="Discard"
            cards={discard}
            playCard={playCard}
            discardCard={discardCard}
            location="discard"
            playable
          />
        )}
        {visibleSections?.exiled && exiled && (
          <Section
            title="Exiled"
            cards={exiled}
            playCard={playCard}
            discardCard={discardCard}
            location="exiled"
          />
        )}
        {visibleSections?.search && inSearch && (
          <Section
            title="Search"
            cards={inSearch}
            playCard={playCard}
            discardCard={discardCard}
            location="search"
            playable
            discardable
          />
        )}
      </div>
    </div>
  );
};

export default Play;
