import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import got from 'got';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  // Инициализируем свойство, чтобы избежать ошибки TS2564
  private initialData!: MockServerData;

  // Метод для загрузки данных с сервера
  private async load(url: string): Promise<void> {
    try {
      const response = await got.get(url);
      this.initialData = JSON.parse(response.body) as MockServerData;
    } catch (error) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  // Метод для записи данных в файл
  private async write(filepath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    // Генерация и запись данных в файл
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  // Возвращаем имя команды
  public getName(): string {
    return '--generate';
  }

  // Метод для выполнения команды
  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      // Загружаем данные и записываем их в файл
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
