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
  AutoFailIcon,
  BlessIcon,
  CurseIcon,
} from '../styles/icons/Arkham';
import classNames from '@/helpers/classNames';
import { t } from '@/helpers/locales';
import { times } from 'lodash';
import IconContainer from '@/styles/IconContainer';
import Image from 'next/image';

const replaceIconsInText = (text: string) => {
  let result: string | ReactNode[] = text;
  let index = 0;

  result = stringReplace(result, '\n', (_match, i) => {
    index += 1;
    return <p key={`br-${index}`} className="py-1" />;
  });
  result = stringReplace(result, '[intellect]', (_match, i) => {
    index++;
    return <IntellectIcon key={`int-${index}`} />;
  });
  result = stringReplace(result, '[Reaction]', (_match, i) => {
    index++;
    return <ReactionIcon key={`rea-${index}`} />;
  });
  result = stringReplace(result, '[free]', (_match, i) => {
    index++;
    return <FastIcon key={`fre-${index}`} />;
  });
  result = stringReplace(result, '[fast]', (_match, i) => {
    index++;
    return <FastIcon key={`fas-${index}`} />;
  });
  result = stringReplace(result, '[auto_fail]', (_match, i) => {
    index++;
    return <AutoFailIcon key={`af-${index}`} />;
  });
  result = stringReplace(result, '[bless]', (_match, i) => {
    index++;
    return <BlessIcon key={`bless-${index}`} />;
  });
  result = stringReplace(result, '[curse]', (_match, i) => {
    index++;
    return <CurseIcon key={`curse-${index}`} />;
  });
  result = stringReplace(result, '[action]', (_match, i) => {
    index++;
    return <ActionIcon key={`act-${index}`} />;
  });
  result = stringReplace(result, '[willpower]', (_match, i) => {
    index++;
    return <WillpowerIcon key={`wil-${index}`} />;
  });
  result = stringReplace(result, '[agility]', (_match, i) => {
    index++;
    return <AgilityIcon key={`agi-${index}`} />;
  });
  result = stringReplace(result, '[combat]', (_match, i) => {
    index++;
    return <CombatIcon key={`com-${index}`} />;
  });
  result = stringReplace(result, /\[\[([^\]]+)\]\]/, (match, i) => {
    index++;
    return (
      <span className="font-bold" key={`bold-${index}`}>
        {match}
      </span>
    );
  });
  result = stringReplace(result, /<i>([^\<]+)<\/i>/, (match, i) => {
    index++;
    return (
      <span className="italic" key={`italic-${index}`}>
        {match}
      </span>
    );
  });
  result = stringReplace(result, /<b>([^\]]+)<\/b>/, (match, i) => {
    index++;
    return (
      <span className="font-bold" key={`bold-${index}`}>
        {match}
      </span>
    );
  });

  return result;
};

const INT_TO_ARKHAM = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  none: '',
};

const ARKHAM_ICONS = {
  health: '',
  sanity: '',
};

const HealthIcon = ({
  health,
}: {
  health: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
}) => {
  return (
    <span className="relative h-10 w-10 flex items-center justify-center">
      <span className="font-card text-red-500 text-4xl absolute">
        {ARKHAM_ICONS.health}
      </span>
      <span className="font-card text-white text-3xl absolute fill-white">
        {INT_TO_ARKHAM[health || 'none'] || health}
      </span>
    </span>
  );
};

const SanityIcon = ({
  sanity,
}: {
  sanity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
}) => {
  return (
    <span className="relative h-10 w-10 flex text-center justify-center items-center">
      <span className="font-card text-blue-500 text-4xl absolute z-0">
        {ARKHAM_ICONS.sanity}
      </span>
      <span className="font-card text-white text-3xl fill-white absolute z-10">
        {INT_TO_ARKHAM[sanity || 'none'] || sanity}
      </span>
    </span>
  );
};

const ActionButton = ({
  name,
  component,
  click,
  className,
}: {
  name?: string;
  component?: ReactNode;
  click: () => void;
  className?: string;
}) => (
  <button
    className={classNames(className, 'inline px-2 text-xl')}
    onClick={click}
  >
    {component || name}
  </button>
);

const Card = ({
  card,
  className,
  actions,
}: {
  card: HandCard;
  className?: string;
  actions?: Array<{
    name: string;
    component?: ReactNode;
    click: () => void;
  }>;
}) => {
  return (
    <article
      className={classNames(
        `flex flex-col items-center justify-center bg-${card.faction_code} rounded-lg w-96 text-gray-200 border border-${card.faction_code}`,
        className
      )}
    >
      <header
        className={`flex flex-row justify-between items-center text-white w-full`}
      >
        <span className="w-8 h-8 rounded-full border-white border-solid border flex justify-center items-center ml-1 mt-1">
          {(card as any)['cost'] || '-'}
        </span>
        <span className="font-bold text-xl text-gray-200">{card.name}</span>
        <span></span>
      </header>
      <section className={`mt-2 w-full`}>
        <div className={`bg-slate-800 p-2 relative text-gray-100 rounded-md`}>
          <header className="min-h-24">
            <p className="font-bold">
              {t(card.type_code)}
              {card.type_code == 'asset' && ` - ${card.slot}`}
            </p>
            <p className="font-bold italic">
              {replaceIconsInText(card.traits)}
            </p>
            <p className="flex space-x-1">
              {times(card.skill_willpower || 0, () => (
                <IconContainer className="bg-blue-600">
                  <WillpowerIcon />
                </IconContainer>
              ))}
              {times(card.skill_intellect || 0, () => (
                <IconContainer className="bg-yellow-600">
                  <IntellectIcon />
                </IconContainer>
              ))}
              {times(card.skill_combat || 0, () => (
                <IconContainer className="bg-red-600">
                  <CombatIcon />
                </IconContainer>
              ))}
              {times(card.skill_agility || 0, () => (
                <IconContainer className="bg-green-600">
                  <AgilityIcon />
                </IconContainer>
              ))}
            </p>
          </header>
          <p>{replaceIconsInText(card.text)}</p>
          {card.imagesrc && (
            <span className="absolute top-2 right-2">
              <Image
                src={`https://fr.arkhamdb.com${card.imagesrc}`}
                alt={card.name}
                width={1500}
                height={2000}
                className="object-cover w-20 h-20 object-top rounded"
                fill={false}
              />
            </span>
          )}
          {card.type_code === 'asset' && (card.health || card.sanity) && (
            <p className="flex justify-center space-x-2 mt-4">
              <HealthIcon health={card.health} />
              <SanityIcon sanity={card.sanity} />
            </p>
          )}
        </div>
      </section>
      {actions && (
        <footer
          className={`border-t border-solid border-${card.faction_code} w-full py-1`}
        >
          <ul className="flex">
            {actions.map((action) => (
              <li key={action.name}>
                <ActionButton
                  click={action.click}
                  component={action.component}
                  name={action.name}
                />
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};

export default Card;
