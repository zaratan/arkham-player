import Play from '@/components/Play';
import getDeck from '@/lib/arkhamdb/getDeck';
import React from 'react';

const DeckPage = async ({
  params: { deckId },
}: {
  params: { deckId: string };
}) => {
  const deck = await getDeck(deckId);

  if (!deck) {
    return <div>Deck not found</div>;
  }

  return <Play deck={deck} />;
};

export default DeckPage;
