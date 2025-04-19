import { getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/index.js';
import { IOfferGenerator } from './offer-generator.interface.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomItem<string>(this.mockData.postDates);
    const city = getRandomItem<string>(this.mockData.cities);
    const imagePreview = getRandomItem<string>(this.mockData.previewPhotos);
    const photosHousing = getRandomItems<string>(this.mockData.photos, 6).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremiums);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorites);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const houseType = getRandomItem<string>(this.mockData.types);
    const numberRooms = getRandomItem<number>(this.mockData.roomCounts);
    const numberGuests = getRandomItem<number>(this.mockData.guestsCounts);
    const price = getRandomItem<number>(this.mockData.prices);
    const conveniences = getRandomItems<string>(this.mockData.facilities).join(';');
    const firstname = getRandomItem<string>(this.mockData.authorNames);
    const email = getRandomItem<string>(this.mockData.authorEmails);
    const avatarPath = getRandomItem<string>(this.mockData.authorAvatars);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    return [
      title, description, postDate, city, imagePreview, photosHousing, isPremium,
      isFavorite, rating, houseType, numberRooms, numberGuests, price,
      conveniences, firstname, email, avatarPath, coordinates
    ].join('\t');
  }
}
