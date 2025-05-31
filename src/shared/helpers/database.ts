export function getMongoURI(
  _username: string,
  _password: string,
  host: string,
  port: string,
  databaseName: string,
): string {
  return `mongodb://${host}:${port}/${databaseName}`;
}
