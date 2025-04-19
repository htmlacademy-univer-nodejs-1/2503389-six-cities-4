import { Command } from './command.interface.js';
import { TSVFileReader, createOffer } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { CityService } from '../../shared/modules/city/city-service.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { DefaultCityService } from '../../shared/modules/city/city.service.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { CityModel } from '../../shared/modules/city/city.entity.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';


export class ImportCommand implements Command {
  private userService: UserService;
  private cityService: CityService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    const city = await this.cityService.findByCityNameOrCreate(offer.city.name, offer.city);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      cityId: city.id,
      imagePreview: offer.imagePreview,
      photosHousing: offer.photosHousing,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      numberRooms: offer.numberRooms,
      numberGuests: offer.numberGuests,
      price: offer.price,
      conveniences: offer.conveniences,
      authorId: author.id,
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
