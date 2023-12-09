import Play from '@/components/Play';
import { TestIcon } from '@/styles/icons/Arkham';
import PlayContext, { PlayProvider } from '@/contexts/PlayContext';
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

  return (
    <PlayProvider deck={deck} deckId={deckId}>
      <Play />
    </PlayProvider>
  );
};

export default DeckPage;
