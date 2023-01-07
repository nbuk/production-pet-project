import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country/model/types/country";

export interface Profile {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  avatar?: string;
}
