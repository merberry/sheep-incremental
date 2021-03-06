import { LocksData as LockList } from "../data";

export type Lock = keyof typeof LockList;

type Indexed<T extends string, U> = {
  [P in T]: U;
};

export interface IResourcesTemplateData extends Indexed<Currency, IResourceTemplate> { }

export interface IResourcesData extends Indexed<Currency, IResource> { }

const CurrencyObject = {
  territory: true,
  folklore: true,
  wood: true,
  flint: true,
  "stone tools": true,
  "complex tools": true,
  grain: true,
  flour: true,
  water: true,
  bread: true,
  beer: true,
  "mud bricks": true,
  "raw meat": true,
  meat: true,
  clay: true,
  stone: true,
  charcoal: true,
  pottery: true,
  "animal skin": true,
  "animal bone": true,
  "carvings": true,
  leather: true,
  microliths: true,
  advancement: true,
};

export const CurrencyArray = Object.keys(CurrencyObject) as Currency[];

export type Currency = keyof typeof CurrencyObject;
export type EffectProp = "cost" | "production" | "consumption" | "storage";
export type GameEvent = 'buy' | 'change-selection' | 'prestige' | 'disable' | 'change-branch';
export type GameObjectType = "building" | "producer" | "discovery" | "storage" | "upgrade" | "idea";

const industryBranchesObject = {
  housing: true,
  construction: true,
  bread: true,
  beer: true,
  hunting: true,
  pottery: true,
  culture: true
};
export const branchesArray = Object.keys(industryBranchesObject) as IndustryBranch[];

export type IndustryBranch = keyof typeof industryBranchesObject;

export interface Price extends Partial<Indexed<Currency, number>> {
  [index: string]: number | undefined;
}

export interface Map<T> {
  [index: string]: T;
}

export interface IResourceTemplate {
  name: string;
  baseLimit?: number;
  precision: number;
  originalLocks: Lock[];
}

export interface IResource {
  template: IResourceTemplate;
  limit?: number;
  amount: number;
  gainPerSecond: number;
  locks: Lock[];
  amountSpent: number;
}

export interface UpgradeEffect {
  affectedObjectId: string;
  affectedProperty: EffectProp;
  type: "add" | "mul";
  scale: Price;
}

export interface IPopulation {
  workers: number;
  population: number;
  housing: number;
}
