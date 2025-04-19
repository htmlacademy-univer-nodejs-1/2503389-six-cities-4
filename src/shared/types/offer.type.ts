import { ConvenienceType } from './convenience-type.enum.js';
import { User } from './user.type.js';
import { Comment } from './comment.type.js';
import { HouseType } from './house-type.enum.js';
import { City } from './index.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  imagePreview: string;
  photosHousing: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HouseType;
  numberRooms: number;
  numberGuests: number;
  price: number;
  conveniences: ConvenienceType[];
  author: User;
  comments: Comment[];
}
