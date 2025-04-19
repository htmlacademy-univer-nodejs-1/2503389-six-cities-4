import 'reflect-metadata';
import { Container } from 'inversify';
import { RestModule } from './rest/rest.container';
import { UserModule } from './shared/modules/user/user.container';

async function bootstrap() {
  const appContainer = new Container();
  await appContainer.load(RestModule, UserModule);

  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

void bootstrap();
