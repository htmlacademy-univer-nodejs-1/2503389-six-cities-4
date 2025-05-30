export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
): string {
  // вот эта строка использует ВСЕ параметры
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
