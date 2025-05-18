// TODO: сделать абстрактный класс для подключения бд
abstract class IDataBaseStrategy {
  Future<void> connect() async {}
}