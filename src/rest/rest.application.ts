import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config';
import { Logger } from '../shared/libs/logger';
import { Component } from '../shared/types/component.enum';


@injectable()
export class RestApplication {
  constructor (
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application Initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
