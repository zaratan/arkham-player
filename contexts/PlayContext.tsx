'use client';

import HandCard from '@/types/card';
import { DeckFull } from '@/types/deck';
import { shuffle, times } from 'lodash';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
  shuffleDeck: () => void;
  drawCard: () => void;
  discardCard: (
    index: number,
    source: 'hand' | 'deck' | 'play' | 'search'
  ) => void;
  playCard: (index: number, source: 'hand' | 'search') => void;
  shuffleBackDiscard: () => void;
  shuffleCardIntoDeck: (
    index: number,
    source: 'play' | 'hand' | 'discard' | 'search',
    cardPlace?: 'shuffle' | 'top' | 'bottom'
  ) => void;
  getCardFromDiscard: (index: number) => void;
  getCardFromSearch: (index: number) => void;
  exileCard: (
    index: number,
    source: 'hand' | 'deck' | 'discard' | 'search'
  ) => void;
  search: (count: number) => void;
  clearSearch: (mode: 'shuffle' | 'top') => void;
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
  drawCard: () => {},
  discardCard: () => {},
  playCard: () => {},
  shuffleBackDiscard: () => {},
  shuffleDeck: () => {},
  shuffleCardIntoDeck: () => {},
  getCardFromDiscard: () => {},
  getCardFromSearch: () => {},
  exileCard: () => {},
  search: () => {},
  clearSearch: () => {},
};

const drawCard = (
  deck: HandCard[],
  hand: HandCard[],
  setDeck: (deck: HandCard[]) => void,
  setHand: (cards: HandCard[]) => void
) => {
  const card = deck.pop();
  if (card === undefined) {
    return;
  }
  setDeck(deck);
  setHand([...hand, card]);
  return;
};

const shuffleBackDiscard = (
  discard: HandCard[],
  setDiscard: (cards: HandCard[]) => void,
  deck: HandCard[],
  setDeck: (cards: HandCard[]) => void
) => {
  setDeck(shuffle([...deck, ...discard]));
  setDiscard([]);
};

const moveCardInto = (
  index: number,
  source: HandCard[],
  cardPlace: 'shuffle' | 'top' | 'bottom',
  setSource: (cards: HandCard[]) => void,
  deck: HandCard[],
  setDeck: (cards: HandCard[]) => void
) => {
  const card = source.splice(index, 1)[0];
  setSource(source);
  let newDeck: HandCard[];
  switch (cardPlace) {
    case 'shuffle':
      newDeck = shuffle([...deck, card]);
      break;
    case 'top':
      newDeck = [card, ...deck];
      break;
    default:
      newDeck = [...deck, card];
      break;
  }

  setDeck(newDeck);
};

const cardListToArray = (deck: DeckFull) => {
  const cards: HandCard[] = [];
  deck.cards.forEach((cardItem) => {
    times(cardItem.count, () => {
      cards.push(cardItem.card);
    });
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

    shuffleDeck: () => setCurrentDeck(shuffle(currentDeck)),
    drawCard: () => {
      drawCard(currentDeck, hand, setCurrentDeck, setHand);
    },
    discardCard: (
      index: number,
      source: 'hand' | 'deck' | 'play' | 'search'
    ) => {
      switch (source) {
        case 'hand':
          moveCardInto(index, hand, 'top', setHand, discard, setDiscard);
          break;
        case 'deck':
          moveCardInto(
            index,
            currentDeck,
            'top',
            setCurrentDeck,
            discard,
            setDiscard
          );
          break;
        case 'search':
          moveCardInto(
            index,
            inSearch,
            'top',
            setInSearch,
            discard,
            setDiscard
          );
          break;

        default:
          moveCardInto(index, inPlay, 'top', setInPlay, discard, setDiscard);
          break;
      }
    },
    setResources: setResources,
    playCard: (index: number) =>
      moveCardInto(index, hand, 'top', setHand, inPlay, setInPlay),
    shuffleBackDiscard: () =>
      shuffleBackDiscard(discard, setDiscard, currentDeck, setCurrentDeck),
    exileCard: (index: number) =>
      moveCardInto(index, hand, 'bottom', setHand, exiled, setExiled),
    shuffleCardIntoDeck: (
      index: number,
      source: 'play' | 'hand' | 'discard' | 'search',
      cardPlace: 'shuffle' | 'top' | 'bottom' = 'shuffle'
    ) => {
      let cardsSource: HandCard[];
      let sourceSet: (cards: HandCard[]) => void;
      switch (source) {
        case 'play':
          cardsSource = inPlay;
          sourceSet = setInPlay;
          break;
        case 'hand':
          cardsSource = hand;
          sourceSet = setHand;
          break;
        case 'search':
          cardsSource = inSearch;
          sourceSet = setInSearch;
          break;

        default:
          cardsSource = discard;
          sourceSet = setDiscard;
          break;
      }
      moveCardInto(
        index,
        cardsSource,
        cardPlace,
        sourceSet,
        currentDeck,
        setCurrentDeck
      );
    },
    getCardFromDiscard: (index: number) =>
      moveCardInto(index, discard, 'top', setDiscard, hand, setHand),
    getCardFromSearch: (index: number) =>
      moveCardInto(index, inSearch, 'top', setInSearch, hand, setHand),
    search: (count: number) => {
      times(count, () => {
        moveCardInto(
          0,
          currentDeck,
          'top',
          setCurrentDeck,
          inSearch,
          setInSearch
        );
      });
    },
    clearSearch: (mode: 'shuffle' | 'top' = 'shuffle') => {
      console.log('clearSearch', inSearch);

      times(inSearch.length, () => {
        moveCardInto(
          0,
          inSearch,
          mode,
          setInSearch,
          currentDeck,
          setCurrentDeck
        );
      });
    },
  };
  return (
    <PlayContext.Provider value={context}>{children}</PlayContext.Provider>
  );
};

export default PlayContext;
