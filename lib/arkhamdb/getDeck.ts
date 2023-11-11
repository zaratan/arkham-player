import { DeckFull } from '@/types/deck';
import getCard from './getCard';
import HandCard, { PlayerCard } from '@/types/card';

const getDeck = async (id: number | string) => {
  let response: Response;
  let deck: DeckFull;
  response = await fetch(`https://fr.arkhamdb.com/api/public/decklist/${id}`);
  try {
    deck = await response.json();
  } catch (e) {
    response = await fetch(`https://fr.arkhamdb.com/api/public/deck/${id}`);
    deck = await response.json();
  }

  deck.cards = [];
  for (let k of Object.keys(deck.slots)) {
    const card = (await getCard(k)) as HandCard;
    deck.cards.push({
      count: deck.slots[k],
      card,
    });
  }

  await Promise.all(Object.values(deck.cards).map((e) => e.card));

  deck.investigator = (await getCard(deck.investigator_code)) as PlayerCard;

  return deck;
};

export default getDeck;
