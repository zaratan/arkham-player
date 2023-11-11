import { Card } from '@/types/card';

const getAllCards: () => Promise<Array<Card>> = async () => {
  const response = await fetch('https://fr.arkhamdb.com/api/public/cards');
  return response.json();
};

export default getAllCards;
