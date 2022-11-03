import { Currency } from "entities/Currency";
import { Country } from "entities/Country/model/types/country";

export interface Profile {
  firstname?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}