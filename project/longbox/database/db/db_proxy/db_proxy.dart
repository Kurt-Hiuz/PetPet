import 'package:petpet/src/database/db/database.dart';
import 'package:petpet/src/database/i_database_strategy/i_database_strategy.dart';

final class DbProxy implements IDataBaseStrategy {
  late final Database workingDb = Database();

  void useStrategy(IDataBaseStrategy newStrategy) {
    workingDb.setStrategy(newStrategy);
  }

  @override
  connect() {
    print("--- Proxy: Request query to connect");
    workingDb.connect();
  }

  @override
  getData() {
    print("--- Proxy: Request query to get data");
    workingDb.getData();
  }

  @override
  insertData() {
    print("--- Proxy: Request query to insert data");
    workingDb.insertData();
  }
}