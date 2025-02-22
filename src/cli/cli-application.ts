import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface';


type TCommandCollection = Record<string, Command>;

export class CLIApplication {
  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  private commands: TCommandCollection = {};

  public registredCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if(Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is alredy registered.`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command {
    if(!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
