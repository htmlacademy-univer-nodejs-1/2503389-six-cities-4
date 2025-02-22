import { ICommand } from './command.interface';


export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример: 
        cli.js --<command>-- [--argument]
      Команды: 
        --version:                       # Номер версии
        --help:                          # Печатает данный текст
        --import <path>:                 # Импортирует данные 
        -- generate <n> <path> <url>     # Генерирует данные
    `);
  }
}
