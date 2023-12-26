import fr from '../locales/fr.json';
import get from 'lodash/get';
import Link from 'next/link';
import { merge } from 'lodash';
import { ReactElement } from 'react';

const locales = merge(fr);

export function getList<T>(key: string): T[] {
  const keys = key.split('.');
  return get(locales, keys) || [];
}

export const t = (key: string, _params?: any) => {
  const keys = key.split('.');
  const value = get(locales, keys);

  if (Array.isArray(value)) {
    return value.flatMap((v) => linkReplacement(v));
  } else {
    return linkReplacement(value || '');
  }
};

export const s = (text: string | Array<string>) => {
  if (Array.isArray(text))
    return text.map((t, i) => (
      <span className="block" key={i}>
        {boldReplacement(t)}
      </span>
    ));
  return boldReplacement(italicReplacement(text));
};

const linkReplacement = (text: string) => {
  const splitRegex = /(\[[^\]]+\]\([^\)]+\))/g;
  const replaceRegex = /\[(?<destination>[^\]]+)\]\((?<text>[^\)]+)\)/;

  const splitedString = text.split(splitRegex);
  if (splitedString.length === 1)
    return boldReplacement(italicReplacement(text));

  const subst = (match: { destination: string; text: string }) => (
    <Link
      href={match.destination}
      className="text-melement hover:text-mhighlight transition-colors"
    >
      {boldReplacement(italicReplacement(match.text))}
    </Link>
  );

  return splitedString.map((s) => {
    let match = replaceRegex.exec(s);
    if (match && match.groups) {
      return subst(match.groups as { destination: string; text: string });
    } else {
      return boldReplacement(italicReplacement(s));
    }
  });
};

const boldReplacement: (
  text: string | JSX.Element | (string | JSX.Element)[]
) => string | JSX.Element | (string | JSX.Element)[] = (text) => {
  const splitRegex = /(\*\*[^\*]+\*\*)/g;
  const replaceRegex = /\*\*(?<text>[^\*]+)\*\*/;

  if (Array.isArray(text)) return text.flatMap((t) => boldReplacement(t));
  if (typeof text !== 'string') return text;

  const splitedString = text.split(splitRegex);

  if (splitedString.length === 1) return text;

  const subst = (match: { text: string }) => (
    <span className="font-bold">{match.text}</span>
  );

  return splitedString.map((s) => {
    let match = replaceRegex.exec(s);
    if (match && match.groups) {
      return subst(match.groups as { text: string });
    } else {
      return s;
    }
  });
};

const italicReplacement = (text: string) => {
  const splitRegex = /(_[^\*]+_)/g;
  const replaceRegex = /_(?<text>[^\*]+)_/;

  const splitedString = text.split(splitRegex);

  if (splitedString.length === 1) return text;

  const subst = (match: { text: string }) => (
    <span className="italic">{match.text}</span>
  );

  return splitedString.map((s) => {
    let match = replaceRegex.exec(s);
    if (match && match.groups) {
      return subst(match.groups as { text: string });
    } else {
      return s;
    }
  });
};
