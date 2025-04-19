import { Facilities } from '../../../types/facilities.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';
import { City, Coordinates } from '../../../types/index.js';


export class CreateOfferDto {
  name: string;
  description: string;
  datePublished: Date;
  city: City;
  previewImagePath: string;
  photosPaths: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: HouseType;
  numberRooms: number;
  numberGuests: number;
  rentPrice: number;
  facilities: Facilities[];
  userId: string;
  numberComments: number;
  coordinates: Coordinates;
}
