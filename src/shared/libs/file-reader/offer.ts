import {
  Offer,
  City,
  HouseType,
  ConvenienceType,
  User,
  UserType,
  Comment         // чтобы типизировать пустой массив comments
} from '../../types';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    imagePreview,
    photosHousing,
    isPremium,
    isFavorite,
    rating,
    houseType,
    numberRooms,
    numberGuests,
    price,
    conveniences,
    firstname,
    email,
    avatarPath,
    userType
    // coordinates   ← убрали из деструктуризации
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    firstname,
    email,
    avatarPath,
    type: userType as UserType
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as unknown as City,
    imagePreview,
    photosHousing: photosHousing
      ? photosHousing.split(';').map((url) => url.trim())
      : [],
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseInt(rating, 10),
    type: houseType as HouseType,
    numberRooms: parseInt(numberRooms, 10),
    numberGuests: parseInt(numberGuests, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences
      ? conveniences.split(';').map((c) => c.trim() as ConvenienceType)
      : [],
    author: user,
    comments: [] as Comment[]        // обязательное поле интерфейса Offer
  };
}
