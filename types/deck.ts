import HandCard, { PlayerCard } from './card';

export interface Deck {
  id: number;
  name: string;
  date_creation: string;
  date_update?: string | null;
  description_md: string | null;
  user_id: null | number | string;
  investigator_code: string;
  investigator_name: string;
  slots: {
    [key: string]: number;
  };
  sideSlots?:
    | []
    | {
        [key: string]: number;
      };
  ignoreDeckLimitSlots: null;
  version: string;
  xp: null | number;
  xp_spent: null | number;
  xp_adjustment: number;
  exile_string: null | string;
  taboo_id: null | 6;
  meta: string;
  tags: string;
  previous_deck: null | number;
  next_deck: null | number;
  problem: null | string;
}

export interface DeckFull extends Deck {
  cards: Array<{
    count: number;
    card: HandCard;
  }>;
  investigator: PlayerCard;
}

export default Deck;
