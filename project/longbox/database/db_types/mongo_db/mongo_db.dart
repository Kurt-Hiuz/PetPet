import 'package:petpet/src/database/i_database_strategy/i_database_strategy.dart';

import 'package:mongo_dart/mongo_dart.dart';

final class MongoDb implements IDataBaseStrategy {
  // ignore: prefer_typing_uninitialized_variables
  late final _db;


  // TODO: сделать нормальное подключение
  @override
  connect() async {
    print('MongoDB debug: trying to connect');
    try {
      _db = Db("mongodb://MongoDB-7.0:27017/testingDB");
      await _db.open();
      print("MongoDb connected");
    } catch (e) {
      print("Error connection: $e");
    }
  }

  @override
  getData() async  {
    // var coll = _db.collection('find');
    // print(await coll.find(where.sortBy('itemId').skip(300).limit(25)).toList());
    print("MongoDb: Got data");
  }

  @override
  insertData() {
    print("MongoDb: Inserted data");
  }
}