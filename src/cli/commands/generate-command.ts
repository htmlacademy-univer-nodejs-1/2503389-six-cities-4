import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { Command } from './command.interface.js';
import got from 'got';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData!: MockServerData;

  private async load(url: string) {
    try {
      // Исправленный запрос с использованием .body
      const response = await got.get(url);
      this.initialData = JSON.parse(response.body);
    } catch (error: unknown) {
      throw new Error(`Can't load data from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
