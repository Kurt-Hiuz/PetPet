import 'package:petpet/src/database/i_database_strategy/i_database_strategy.dart';

final class Database implements IDataBaseStrategy {
  IDataBaseStrategy? dbWorkingStrategy;

  @override
  connect() {
    print("--- DataBase: DB request to connect");
    dbWorkingStrategy?.connect();
  }

  @override
  getData() {
    print("--- DataBase: Got data");
    dbWorkingStrategy?.getData();
  }

  @override
  insertData() {
    print("--- DataBase: Inserted data");
    dbWorkingStrategy?.insertData();
  }

  void setStrategy(IDataBaseStrategy newStrategy) {
    dbWorkingStrategy = newStrategy;
  }
}