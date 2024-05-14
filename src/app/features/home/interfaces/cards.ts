export interface ICards {
  name: string;
  manaCost: string;
  cmc: number;
  colors?: string[];
  colorIdentity?: string[];
  type: string;
  types?: string[];
  subtypes?: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  artist: string;
  number: string;
  power: string;
  toughness: string;
  layout: string;
  multiverseid: string;
  imageUrl: string;
  variations?: string[];
  printings?: string[];
  originalText: string;
  originalType: string;
  id: string;
}

// export interface ICards {
//   name: string;
//   manaCost: string;
//   cmc: number;
//   colors?: string[];
//   colorIdentity?: string[];
//   type: string;
//   types?: string[];
//   subtypes?: string[];
//   rarity: string;
//   set: string;
//   setName: string;
//   text: string;
//   artist: string;
//   number: string;
//   power: string;
//   toughness: string;
//   layout: string;
//   multiverseid: string;
//   imageUrl: string;
//   variations?: string[];
//   foreignNames?: ForeignName[];
//   printings?: string[];
//   originalText: string;
//   originalType: string;
//   legalities?: Legality[];
//   id: string;
// }

// export interface ForeignName {
//   name: string;
//   text: string;
//   type: string;
//   flavor: string;
//   imageUrl: string;
//   language: string;
//   multiverseid: number;
// }

// export interface Legality {
//   format: string;
//   legality: string;
// }

// export interface ICards {
//   id?: string;
//   name: string;
//   imageUrl: string;
//   data: string;
// }
