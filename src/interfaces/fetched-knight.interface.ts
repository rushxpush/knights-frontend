import type { Attributes } from "./attributes.interface"
import type { Weapon } from "./weapon.interface"

export interface FetchedKnight {
  _id: string;
  name: string;
  nickname: string;
  birthday: string;
  weapons: Array<Weapon>;
  attributes: Attributes;
  keyAttribute: string;
  _v: string;
  experience: number;
  attack: number;
  age: number;
}
