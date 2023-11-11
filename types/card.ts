export interface Card {
  pack_code: string;
  pack_name: string;
  type_code: string;
  type_name: string;
  subtype_code?: string;
  subtype_name?: string;
  faction_code: string;
  faction_name: string;
  position: number;
  exceptional: boolean;
  myriad: boolean;
  code: string;
  name: string;
  real_name: string;
  text: string;
  real_text: string;
  quantity: number;
  health_per_investigator: boolean;
  deck_limit: number;
  real_slot: string;
  traits: string;
  real_traits: string;
  is_unique: boolean;
  hidden: boolean;
  permanent: boolean;
  double_sided: boolean;
  url: string;
  duplicated_by?: Array<string>;
  flavor?: string;
  restrictions?: {
    investigator: {
      [key: string]: string;
    };
  };
  imagesrc?: string;
}

export interface AssetCard extends Card {
  type_code: 'asset';
  cost?: number;
  skill_willpower?: number;
  skill_intellect?: number;
  skill_combat?: number;
  skill_agility?: number;
  skill_wild?: number;
  slot?: string;
  xp: number;
}

export interface EventCard extends Card {
  type_code: 'event';
  cost?: number;
  skill_willpower?: number;
  skill_intellect?: number;
  skill_combat?: number;
  skill_agility?: number;
  skill_wild?: number;
  xp: number;
}

export interface SkillCard extends Card {
  type_code: 'skill';
  skill_willpower?: number;
  skill_intellect?: number;
  skill_combat?: number;
  skill_agility?: number;
  skill_wild?: number;
  xp: number;
}

export interface TreacheryCard extends Card {
  type_code: 'treachery';
  skill_willpower?: number;
  skill_intellect?: number;
  skill_combat?: number;
  skill_agility?: number;
  skill_wild?: number;
}

type HandCard = AssetCard | EventCard | SkillCard | TreacheryCard;

export default HandCard;

type DeckOption =
  | {
      faction: Array<string>;
      level: {
        min: number;
        max: number;
      };
      limit?: number;
      error?: string;
    }
  | {
      not?: boolean;
      trait: Array<string>;
      type?: Array<string>;
      level: {
        min: number;
        max: number;
      };
      error?: string;
    }
  | {
      level: {
        min: number;
        max: number;
      };
      limit?: number;
      error?: string;
    }
  | {
      tag: Array<string>;
      text?: Array<string>;
      level: {
        min: number;
        max: number;
      };
    }
  | {
      uses: Array<string>;
      level: {
        min: number;
        max: number;
      };
    }
  | {
      name: 'Deck Size';
      deck_size_select: Array<string>;
      faction: Array<string>;
    }
  | {
      name: 'Secondary Class';
      faction_select: Array<string>;
      level: {
        min: number;
        max: number;
      };
      type?: Array<string>;
      limit?: number;
    }
  | {
      name: 'Class Choice';
      id: string;
      faction_select: Array<string>;
      level: {
        min: number;
        max: number;
      };
    };

export interface PlayerCard extends Card {
  type_code: 'investigator';
  subname?: string;
  skill_willpower: number;
  skill_intellect: number;
  skill_combat: number;
  skill_agility: number;
  health: number;
  sanity: number;
  deck_requirements: {
    size: number;
    card: {
      [key: string]: {
        [key: string]: string;
      };
    };
    random: Array<{ target: string; value: string }>;
  };
  deck_options: Array<DeckOption>;
  flavor?: string;
  illustrator: string;
  is_unique: true;
  permanent: false;
  double_sided: true;
  back_text: string;
  back_flavor: string;
  octgn_id: string;
  imagesrc: string;
  backimagesrc: string;
  duplicated_by?: Array<string>;
  alternated_by?: Array<string>;
}
