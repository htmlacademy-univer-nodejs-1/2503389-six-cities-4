#!/usr/bin/env node
import { CLIApplication } from './shared/types';
import { HelpCommand } from './cli/commands/help.command';
import { VersionCommand } from './cli/commands/version.command';
import { ImportCommand } from './cli/commands/import.command';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registredCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
