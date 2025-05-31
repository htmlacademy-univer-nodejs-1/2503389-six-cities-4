import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { UserModel, UserEntity } from './user.entity.js';
import { UserService } from './user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DocumentType } from '@typegoose/typegoose';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new this.userModel(dto);
    user.setPassword(dto.password, salt);
    const saved = await user.save();
    this.logger.info(`Created user ${saved.email}`);
    return saved as DocumentType<UserEntity>;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email }).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existing = await this.findByEmail(dto.email);
    return existing ?? (await this.create(dto, salt));
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec() as Promise<DocumentType<UserEntity> | null>;
  }

  public async verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);
    if (!user) {
      return null;
    }
    return user.verifyPassword(dto.password) ? user : null;
  }
}
