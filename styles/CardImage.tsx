import HandCard from '@/types/card';
import Image from 'next/image';
import React from 'react';

const CardImage = ({
  card,
  className,
}: {
  card: HandCard;
  className?: string;
}) => {
  return (
    card.imagesrc && (
      <Image
        src={`https://fr.arkhamdb.com${card.imagesrc}`}
        alt={card.name}
        width={500}
        height={1200}
        quality={100}
        className={className}
      />
    )
  );
};

export default CardImage;
