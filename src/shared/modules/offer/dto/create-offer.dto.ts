import { ConvenienceType } from '../../../types/convenience-type.enum.js';
import { HouseType } from '../../../types/house-type.enum.js';


export class CreateOfferDto {
  title!: string;
  description!: string;
  postDate!: Date;
  cityId!: string;
  imagePreview!: string;
  photosHousing!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  type!: HouseType;
  numberRooms!: number;
  numberGuests!: number;
  price!: number;
  conveniences!: ConvenienceType[];
  authorId!: string;
}
