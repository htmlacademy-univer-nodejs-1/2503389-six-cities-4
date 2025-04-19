import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ConvenienceType, HouseType } from '../../types/index.js';
import { CityEntity } from '../city/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public cityId!: Ref<CityEntity>;

  @prop()
  public imagePreview!: string;

  @prop({
    type: () => String,
  })
  public photosHousing!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: HouseType
  })
  public type!: HouseType;

  @prop()
  public numberRooms!: number;

  @prop()
  public numberGuests!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    enum: ConvenienceType
  })
  public conveniences!: ConvenienceType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
