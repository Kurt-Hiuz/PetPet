import 'package:petpet/src/database/db/db_proxy/db_proxy.dart';
import 'package:petpet/src/database/i_database_strategy/i_database_strategy.dart';

final class SingletonApp {
  final DbProxy _database = DbProxy();

  static var shared = SingletonApp._();

  SingletonApp._();

  static final SingletonApp _instance = SingletonApp._();

  static SingletonApp get instance {
    return _instance;
  }

  void useDb(IDataBaseStrategy newDb) {
    _database.useStrategy(newDb);
    print("--- App using new DB");
  }

  void connectToDB() {
    _database.connect();
    print("--- App connected to DB");
  }

  void insertDataIntoDB() {
    _database.insertData();
    print("--- App inserted data into DB");
  }

  void getDataFromDB() {
    _database.getData();
    print("--- App got from DB");
  }
}
