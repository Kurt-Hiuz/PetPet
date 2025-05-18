import 'package:petpet/src/db/patterns/i_database_strategy.dart';

class ServerDataBase extends IDataBaseStrategy{
  IDataBaseStrategy? dbWorkingStrategy;
  @override
  Future<void> connect() async {
    print("DataBase: ---DataBase open");
    dbWorkingStrategy?.connect();
  }

  void setStrategy(IDataBaseStrategy newStrategy) {
    print("DataBase: new db set");
    dbWorkingStrategy = newStrategy;
  }
  ServerDataBase();
}