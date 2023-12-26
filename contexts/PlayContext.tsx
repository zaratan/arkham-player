'use client';

import HandCard from '@/types/card';
import { DeckFull } from '@/types/deck';
import { shuffle } from 'lodash';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type locations =
  | 'hand'
  | 'deck'
  | 'play'
  | 'search'
  | 'discard'
  | 'exiled'
  | 'extra1'
  | 'extra2'
  | 'extra3';

type VisibleSections = {
  hand: boolean;
  play: boolean;
  discard: boolean;
  exiled: boolean;
  search: boolean;
  extra1: boolean;
  extra2: boolean;
  extra3: boolean;
};

export type timing = 'setup' | 'play';

type ContextType = {
  deckId?: string;
  deckName?: string;
  baseDeck?: DeckFull;
  resources?: number;
  setResources: (resources: number) => void;
  currentDeck?: HandCard[];
  discard?: HandCard[];
  hand?: HandCard[];
  inPlay?: HandCard[];
  exiled?: HandCard[];
  inSearch?: HandCard[];
  visibleSections?: VisibleSections;
  toggleSection: (section: keyof VisibleSections) => void;
  shuffle: (location: locations) => void;
  drawCard: (source: locations, count?: number) => void;
  discardCard: (source: locations, index: number) => void;
  playCard: (source: locations, index: number) => void;
  shuffleBack: (location: locations) => void;
  shuffleCardIntoDeck: (
    index: number | number[],
    source: locations,
    cardPlace?: 'shuffle' | 'top' | 'bottom'
  ) => void;
  getCard: (source: locations, index: number) => void;
  exileCard: (source: locations, index: number) => void;
  moveCardInto: ({
    index,
    destination,
    source,
    cardPlace,
  }: {
    destination: locations;
    source: locations;
    index: number | number[];
    cardPlace?: 'shuffle' | 'top' | 'bottom';
  }) => void;
  search: (count: number) => void;
  clearSearch: (mode: 'shuffle' | 'top') => void;
  setExtraName: (extra: number, name: string) => void;
  timing: timing;
  setTiming: (timing: timing) => void;
};

const defaultContext: ContextType = {
  deckId: undefined,
  deckName: undefined,
  baseDeck: undefined,
  resources: undefined,
  setResources: () => {},
  currentDeck: undefined,
  discard: undefined,
  hand: undefined,
  inPlay: undefined,
  exiled: undefined,
  inSearch: undefined,
  visibleSections: undefined,
  toggleSection: () => {},
  drawCard: () => {},
  discardCard: () => {},
  playCard: () => {},
  clearSearch: () => {},
  search: () => {},
  shuffle: () => {},
  shuffleBack: () => {},
  shuffleCardIntoDeck: () => {},
  getCard: () => {},
  exileCard: () => {},
  moveCardInto: () => {},
  setExtraName: () => {},
  timing: 'setup',
  setTiming: () => {},
};

const drawCard = (
  deck: HandCard[],
  hand: HandCard[],
  setDeck: (deck: HandCard[]) => void,
  setHand: (cards: HandCard[]) => void,
  count: number = 1
) => {
  let cards: HandCard[] = [];
  console.log('DRAW', count);
  for (let i = 0; i < count; i++) {
    const [card, ...rest] = deck;
    console.log('DRAW CARD :', card);
    if (card) {
      cards = [...cards, card];
    }
    deck = rest;
  }
  if (cards.length === 0) {
    return;
  }
  setDeck(deck);
  setHand([...hand, ...cards]);
  return;
};

const shuffleBack = (
  location: HandCard[],
  setLocation: (cards: HandCard[]) => void,
  into: HandCard[],
  setInto: (cards: HandCard[]) => void
) => {
  setInto(shuffle([...into, ...location]));
  setLocation([]);
};

const moveCardInto = (
  index: number | number[],
  source: HandCard[],
  cardPlace: 'shuffle' | 'top' | 'bottom',
  setSource: (cards: HandCard[]) => void,
  dest: HandCard[],
  setDest: (cards: HandCard[]) => void
) => {
  if (!Array.isArray(index)) {
    index = [index];
  }
  const cards = index.map((i) => source.splice(i, 1)[0]);
  setSource(source);
  let newDeck: HandCard[];
  switch (cardPlace) {
    case 'shuffle':
      newDeck = shuffle([...dest, ...cards]);
      break;
    case 'top':
      newDeck = [...cards, ...dest];
      break;
    default:
      newDeck = [...dest, ...cards];
      break;
  }

  setDest(newDeck);
};

const cardListToArray = (deck: DeckFull) => {
  const cards: HandCard[] = [];
  deck.cards.forEach((cardItem) => {
    for (let i = 0; i < cardItem.count; i++) {
      cards.push(cardItem.card);
    }
  });
  return cards;
};

const PlayContext = createContext(defaultContext);
export const PlayProvider = ({
  children,
  deck,
  deckId,
}: {
  children: ReactNode;
  deckId: string;
  deck: DeckFull;
}) => {
  const cards = cardListToArray(deck);
  const [resources, setResources] = useState(5);
  const [currentDeck, setCurrentDeck] = useState<HandCard[]>(
    shuffle(cards.filter((card) => !card.permanent))
  );
  const [hand, setHand] = useState<HandCard[]>([]);
  const [discard, setDiscard] = useState<HandCard[]>([]);
  const [inPlay, setInPlay] = useState<HandCard[]>(
    cards.filter((card) => card.permanent)
  );
  const [exiled, setExiled] = useState<HandCard[]>([]);
  const [inSearch, setInSearch] = useState<HandCard[]>([]);
  const [extra1, setExtra1] = useState<HandCard[]>([]);
  const [extra1Name, setExtra1Name] = useState<string>('Extra 1');
  const [extra2Name, setExtra2Name] = useState<string>('Extra 2');
  const [extra3Name, setExtra3Name] = useState<string>('Extra 3');
  const [extra2, setExtra2] = useState<HandCard[]>([]);
  const [extra3, setExtra3] = useState<HandCard[]>([]);
  const [timing, setTiming] = useState<timing>('setup');

  const [visibleSections, setVisibleSections] = useState<VisibleSections>({
    hand: true,
    play: true,
    discard: true,
    exiled: false,
    search: false,
    extra1: false,
    extra2: false,
    extra3: false,
  });

  const getLocationCards: (
    location: locations
  ) => [HandCard[], (newLoc: HandCard[]) => void] = (location) => {
    switch (location) {
      case 'hand':
        return [hand, setHand];
      case 'deck':
        return [currentDeck, setCurrentDeck];
      case 'search':
        return [inSearch, setInSearch];
      case 'exiled':
        return [exiled, setExiled];
      case 'discard':
        return [discard, setDiscard];
      case 'extra1':
        return [extra1, setExtra1];
      case 'extra2':
        return [extra2, setExtra2];
      case 'extra3':
        return [extra3, setExtra3];
      case 'play':
      default:
        return [inPlay, setInPlay];
    }
  };

  const context: ContextType = {
    deckId: deckId,
    deckName: deck.name,
    baseDeck: deck,
    resources: resources,
    currentDeck: currentDeck,
    hand: hand,
    discard: discard,
    inPlay: inPlay,
    exiled: exiled,
    inSearch: inSearch,

    shuffle: (location: locations) => {
      const [cards, setCards] = getLocationCards(location);
      setCards(shuffle(cards));
    },
    drawCard: (source: locations, count?: number) => {
      const [sourceCards, setSource] = getLocationCards(source);
      drawCard(sourceCards, hand, setSource, setHand, count || 1);
    },
    discardCard: (source: locations, index: number) => {
      const [sourceCards, setSource] = getLocationCards(source);
      moveCardInto(index, sourceCards, 'top', setSource, discard, setDiscard);
    },
    setResources: setResources,
    toggleSection: (section: keyof VisibleSections) => {
      setVisibleSections({
        ...visibleSections,
        [section]: !visibleSections[section],
      });
    },
    visibleSections: visibleSections,
    playCard: (source: locations, index: number) => {
      const [sourceCards, setSource] = getLocationCards(source);
      moveCardInto(index, sourceCards, 'top', setSource, inPlay, setInPlay);
    },
    exileCard: (source: locations, index: number) => {
      const [sourceCards, setSource] = getLocationCards(source);
      moveCardInto(index, sourceCards, 'bottom', setSource, exiled, setExiled);
    },
    shuffleCardIntoDeck: (
      index: number | number[],
      source: locations,
      cardPlace: 'shuffle' | 'top' | 'bottom' = 'shuffle'
    ) => {
      let [cardsSource, sourceSet] = getLocationCards(source);
      moveCardInto(
        index,
        cardsSource,
        cardPlace,
        sourceSet,
        currentDeck,
        setCurrentDeck
      );
    },
    getCard: (source: locations, index: number) => {
      const [sourceCards, setSource] = getLocationCards(source);
      moveCardInto(index, sourceCards, 'top', setSource, hand, setHand);
    },
    search: (count: number) => {
      setVisibleSections({
        ...visibleSections,
        search: true,
      });
      for (let i = 0; i < count; i++) {
        moveCardInto(
          0,
          currentDeck,
          'top',
          setCurrentDeck,
          inSearch,
          setInSearch
        );
      }
    },
    clearSearch: (mode: 'shuffle' | 'top' = 'shuffle') => {
      setVisibleSections({
        ...visibleSections,
        search: false,
      });
      for (let i = 0; i < inSearch.length; i++) {
        moveCardInto(
          0,
          inSearch,
          mode,
          setInSearch,
          currentDeck,
          setCurrentDeck
        );
      }
    },
    setExtraName: (extra: number, name: string) => {
      switch (extra) {
        case 1:
          setExtra1Name(name);
          break;
        case 2:
          setExtra2Name(name);
          break;
        case 3:
          setExtra3Name(name);
          break;
      }
    },
    shuffleBack: (location: locations) => {
      const [cards, setCards] = getLocationCards(location);
      shuffleBack(cards, setCards, currentDeck, setCurrentDeck);
    },
    moveCardInto: ({
      index,
      destination,
      source,
      cardPlace,
    }: {
      destination: locations;
      source: locations;
      index: number | number[];
      cardPlace?: 'shuffle' | 'top' | 'bottom';
    }) => {
      const [sourceCards, setSource] = getLocationCards(source);
      const [destCards, setDest] = getLocationCards(destination);
      moveCardInto(
        index,
        sourceCards,
        cardPlace || 'shuffle',
        setSource,
        destCards,
        setDest
      );
    },
    timing: timing,
    setTiming: setTiming,
  };
  return (
    <PlayContext.Provider value={context}>{children}</PlayContext.Provider>
  );
};

export default PlayContext;
