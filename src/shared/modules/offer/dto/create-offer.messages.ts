export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalidFormat: 'Must be one of Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  previewImagePath: {
    maxLength: 'Maximum previewImage length must be 256',
  },
  photosPaths: {
    invalidFormat: 'Must be an array',
  },
  isPremium: {
    invalid: 'type is not bool',
  },
  isFavorite: {
    invalidFormat: 'Must be boolean',
  },
  houseType: {
    invalidFormat: 'Must be one of Apartment, House, Room, Hotel',
  },
  numberRooms: {
    min: 'Minimum countRooms must be 1',
    max: 'Maximum countRooms must be 8',
  },
  numberGuests: {
    min: 'Minimum countGuests must be 1',
    max: 'Minimum countGuests must be 10',
  },
  rentPrice: {
    min: 'Minimum price must be 100',
    max: 'Maximum price must be 100000',
  },
  facilities: {
    invalidFormat: 'Must be an array',
    invalidElementFormat:
      'Element must be one of Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Location must be a valid object',
  },
} as const;
