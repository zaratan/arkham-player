import React from 'react';

export const SkullIcon = () => {
  return <span className="font-arkham">k</span>;
};

export const CultistIcon = () => {
  return <span className="font-arkham">l</span>;
};

export const TabletIcon = () => {
  return <span className="font-arkham">q</span>;
};

export const ElderThingIcon = () => {
  return <span className="font-arkham">n</span>;
};

export const AutoFailIcon = () => {
  return <span className="font-arkham">m</span>;
};

export const SucessIcon = () => {
  return <span className="font-arkham">o</span>;
};

export const AgilityIcon = () => {
  return <span className="font-arkham">a</span>;
};

export const CombatIcon = () => {
  return <span className="font-arkham">c</span>;
};

export const WillpowerIcon = () => {
  return <span className="font-arkham">p</span>;
};

export const IntellectIcon = () => {
  return <span className="font-arkham">b</span>;
};

export const RogueIcon = () => {
  return <span className="font-arkham">d</span>;
};

export const SeekerIcon = () => {
  return <span className="font-arkham">h</span>;
};

export const SurvivorIcon = () => {
  return <span className="font-arkham">e</span>;
};

export const GuardianIcon = () => {
  return <span className="font-arkham">f</span>;
};

export const MysticIcon = () => {
  return <span className="font-arkham">g</span>;
};

export const ActionIcon = () => {
  return <span className="font-arkham">i</span>;
};

export const ReactionIcon = () => {
  return <span className="font-arkham">!</span>;
};

export const FastIcon = () => {
  return <span className="font-arkham">j</span>;
};

export const StarIcon = () => {
  return <span className="font-arkham">s</span>;
};

export const DashIcon = () => {
  return <span className="font-arkham">t</span>;
};

export const InvestigatorIcon = () => {
  return <span className="font-arkham">u</span>;
};

export const BlessIcon = () => {
  return <span className="font-arkham">v</span>;
};

export const CurseIcon = () => {
  return <span className="font-arkham">w</span>;
};

export const FrostIcon = () => {
  return <span className="font-arkham">x</span>;
};

export const TestIcon = () => {
  return (
    <ul>
      {'abcdedfghijklmnopqrstuvwxyz0123456789-_=+ABCDEFGHIJKLMNOPQRSTUVWXYZ[]{};:\'"\\|,./<>?`~!@#$%^&*()'
        .split('')
        .map((letter, index) => {
          return (
            <li key={index}>
              {letter}
              <span className="font-arkham">{letter}</span>
            </li>
          );
        })}
    </ul>
  );
};
