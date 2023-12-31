import { Card } from '@/types/card';

const getCard: (id: string) => Promise<Card> = async (id) => {
  const response = await fetch(`https://fr.arkhamdb.com/api/public/card/${id}`);
  const result: Card = await response.json();
  return result;
};

export default getCard;
