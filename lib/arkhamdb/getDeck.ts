import { DeckFull } from '@/types/deck';
import getCard from './getCard';
import HandCard, {
  AssetCard,
  Card,
  PlayerCard,
  customization,
  digit,
} from '@/types/card';
import { t } from '@/helpers/locales';

const applyCustomization = (
  card: HandCard,
  customization: customization,
  text: string
) => {
  if (customization.real_traits) {
    card.real_traits = customization.real_traits;
    card.traits =
      customization.real_traits
        .split('.')
        .filter((e) => e !== '')
        .map((trait) => {
          return t(`traits.${trait.trim()}`);
        })
        .join('. ') + '.';
  }
  console.log(customization);
  if (customization.real_slot) {
    card.real_slot = customization.real_slot;
    (card as AssetCard).slot = t(`slots.${customization.real_slot}`).toString();
  }
  if (customization.health) {
    (card as AssetCard).health = (((card as AssetCard).health || 0) +
      customization.health) as digit;
  }
  if (customization.sanity) {
    (card as AssetCard).sanity = (((card as AssetCard).sanity || 0) +
      customization.sanity) as digit;
  }
  if (customization.cost) {
    (card as AssetCard).cost =
      ((card as AssetCard).cost || 0) + customization.cost;
  }
  if (customization.text_change === 'append') {
    card.text = `${card.text || ''} ${text}`;
  }
  if (customization.text_change === 'insert' && customization.position === 0) {
    card.text = `${text} ${card.text || ''}`;
  }
  return card;
};

export const applyCustomizations = (
  card: HandCard,
  meta: Array<{ id: number; xpSpent: number }>
) => {
  if (!card.customization_options) {
    return card;
  }
  const customization_texts = card.customization_change?.split('\n') || [];
  const customizations = meta
    .filter((e) => {
      return (
        card.customization_options &&
        card.customization_options[e.id] &&
        card.customization_options[e.id].xp <= e.xpSpent
      );
    })
    .map(
      (e) =>
        card.customization_options &&
        card.customization_text && {
          customization: card.customization_options[e.id],
          text: customization_texts[e.id],
        }
    );
  if (customizations.length > 0) {
    customizations.forEach((e) => {
      if (e) {
        card = applyCustomization(card, e.customization, e.text);
      }
    });
  }

  console.log({
    customizations,
    card,
  });
  return card;
};

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

  const meta = JSON.parse(deck.meta);
  console.log(deck, meta);

  for (let k of Object.keys(deck.slots)) {
    let card = (await getCard(k)) as HandCard;

    if (Object.keys(meta).length > 0 && card.customization_options) {
      const parsedMeta = meta[`cus_${card.code}`]
        .split(',')
        .map((e: string) => {
          const [id, xpSpent] = e.split('|');
          return { id, xpSpent };
        });
      if (parsedMeta[0] && parsedMeta[0].id !== '') {
        card = applyCustomizations(card, parsedMeta);
      }
    }

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
