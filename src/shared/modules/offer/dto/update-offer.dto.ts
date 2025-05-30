import { Coordinates, HouseType } from '../../../types';
import { City } from '../../../types/city.enum';
import { Facilities } from '../../../types/facilities.enum';


export class UpdateOfferDto {
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
