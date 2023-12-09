import HandCard from '@/types/card';
import React, { ReactNode } from 'react';

import stringReplace from 'react-string-replace';
import {
  ActionIcon,
  AgilityIcon,
  CombatIcon,
  FastIcon,
  IntellectIcon,
  ReactionIcon,
  WillpowerIcon,
} from '../styles/icons/Arkham';

const replaceIconsInText = (text: string) => {
  let result: string | ReactNode[] = text;

  result = stringReplace(result, '\n', (_match, i) => (
    <p key={`br-${i}`} className="py-1" />
  ));
  result = stringReplace(result, '[intellect]', (_match, i) => (
    <IntellectIcon key={`int-${i}`} />
  ));
  result = stringReplace(result, '[Reaction]', (_match, i) => (
    <ReactionIcon key={`rea-${i}`} />
  ));
  result = stringReplace(result, '[free]', (_match, i) => (
    <FastIcon key={`fre-${i}`} />
  ));
  result = stringReplace(result, '[fast]', (_match, i) => (
    <FastIcon key={`fas-${i}`} />
  ));
  result = stringReplace(result, '[action]', (_match, i) => (
    <ActionIcon key={`act-${i}`} />
  ));
  result = stringReplace(result, '[willpower]', (_match, i) => (
    <WillpowerIcon key={`wil-${i}`} />
  ));
  result = stringReplace(result, '[agility]', (_match, i) => (
    <AgilityIcon key={`agi-${i}`} />
  ));
  result = stringReplace(result, '[combat]', (_match, i) => (
    <CombatIcon key={`com-${i}`} />
  ));
  result = stringReplace(result, /\[\[([^\]]+)\]\]/, (match, i) => (
    <span className="font-bold">{match}</span>
  ));
  result = stringReplace(result, /<i>([^\<]+)<\/i>/, (match, i) => (
    <span className="italic">{match}</span>
  ));
  result = stringReplace(result, /<b>([^\]]+)<\/b>/, (match, i) => (
    <span className="font-bold">{match}</span>
  ));

  return result;
};

const Card = ({ card, className }: { card: HandCard; className?: string }) => {
  console.log(card.text);

  return (
    <article
      className={`flex flex-col items-center bg-${card.faction_code} rounded-lg max-w-xs`}
    >
      <header
        className={`flex flex-row justify-between items-center text-white w-full py-2 px-2`}
      >
        <span className="w-6 h-6 rounded-full border-white border-solid border flex justify-center items-center">
          {(card as any)['cost'] || '-'}
        </span>
        <span>{card.name}</span>
        <span></span>
      </header>
      <section
        className={`p-2 bg-yellow-50 border border-${card.faction_code}`}
      >
        {replaceIconsInText(card.text)}
      </section>
    </article>
  );
};

export default Card;
