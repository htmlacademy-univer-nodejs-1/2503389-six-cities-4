import got from 'got';
import { Command } from './command.interface.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { MockServerData } from '../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      // получаем весь response…
      const response = await got(url);
      // …и берём из него текстовый body
      const raw = response.body;

      // парсим этот текст в JSON
      this.initialData = JSON.parse(raw) as MockServerData;
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`Файл ${filepath} был успешно создан!`);
    } catch (error: unknown) {
      console.error('Не удалось создать данные');

      console.error(getErrorMessage(error));
    }
  }
}
