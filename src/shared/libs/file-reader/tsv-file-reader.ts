import { readFileSync } from 'fs';
import { IFileReader } from './file-reader.interface';
import { Offer } from '../../types/offer.type';
import { City } from '../../types/city.enum';
import { HouseType } from '../../types/house-type.enum';
import { User } from '../../types/user.type';
import { Facilities } from '../../types/facilities.enum';
import { Coordinates } from '../../types/coordinates.enum';


export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewPhoto, photos, isPremium, isFavorite, rating, type, roomCount, guestsCount, price, facilities, name, email, avatarPath, coordinates]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: city as City,
        previewPhoto,
        photos: photos ? photos.split(';').map((url) => url.trim()) : [],
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseInt(rating, 10),
        type: type as HouseType,
        roomCount: parseInt(roomCount, 10),
        guestsCount: parseInt(guestsCount, 10),
        price: parseInt(price, 10),
        facilities: facilities ? facilities.split(';').map((facility) => facility.trim()) as Facilities[] : [],
        author: { name, email, avatarPath} as User,
        coordinates: coordinates as Coordinates,
      }));
  }
}
