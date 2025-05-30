import { User, UserType } from '../../types/index.js';
import { getModelForClass, prop, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ type: String, required: true, default: '' })
  public name!: string;

  @prop({ type: String, unique: true, required: true })
  public email!: string;

  @prop({ type: String, required: false, default: '' })
  public avatarPath!: string;

  @prop({ type: String, required: false, default: UserType.Regular })
  public type!: UserType;

  @prop({ type: String, required: true, default: '' })
  private password!: string;

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string): boolean {
    return this.password === createSHA256(password, process.env.SALT ?? '');
  }

  public getPassword(): string {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
