/// MongoDB - локальное определение методов работы с СУБД MongoDB

import 'package:petpet/src/db/patterns/i_database_strategy.dart';

import 'package:mongo_dart/mongo_dart.dart';

final class MongoDB implements IDataBaseStrategy {
  final _mongoDb = Db("mongodb://MongoDB-7.0:27017/mongo_dart-test");
  
  @override
  Future<State> connect() async {
    // СДЕЛАТЬ: сделать парсер состояний
    print('MongoDB: connect() --- state = ${_mongoDb.state}');
    if(_mongoDb.state != State.open){
      try {
        await _mongoDb.open();
        print("MongoDB: connect() --- MongoDB open");
      } catch(e){
        print("MongoDB: connect() --- Error connection: $e");
      }
    }
    return _mongoDb.state;
  }

  Future<void> insertOne(Map<String, dynamic> newRecord, String usingCollection) async {
    State state = await connect();
    if(state != State.open){
      print("MongoDB: insertOne() --- error to connect. state = $state");
      return;
    }
    var collection = _mongoDb.collection(usingCollection);
    var result = await collection.insertOne(newRecord);
    if(!result.isSuccess){
      print("MongoDB: insertOne() --- error detected in record insertion. result = $result");
    }
    print("MongoDB: insertOne() --- result = $result");
    print("MongoDB: insertOne() --- insert into $usingCollection(${newRecord.toString()})");
  }

  Future<List<Map<String, dynamic>>> selectAll(String usingCollection) async{
    State state = await connect();
    if(state != State.open){
      return Future.error(Exception('MongoDB: selectAll() --- db state error: $state'));
    }  
    var collection = _mongoDb.collection(usingCollection);
    var data = collection.find();
    return data.toList();
  }

  Future<void> dropData(String usingCollection) async{
    State state = await connect();
    if(state != State.open) {
      return Future.error(Exception('MongoDB: dropData() --- db state error: $state'));
    }
    var collection = _mongoDb.collection(usingCollection);
    var result = await collection.drop();
    if(!result){
      print("MongoDB: dropData() --- error detected in clearing collection data. result = $result");
    }
    print("MongoDB: dropData() --- all data cleared. result = $result");
  }

  Future<List<dynamic>> getDbsList() async{
    State state = await connect();
    if(state == State.open){
      return await _mongoDb.listDatabases();
    } else {
      return Future.error(Exception('MongoDB: getDbsList() --- db state error: $state'));
    }
  }

  Future<void> showDbs() async {
    List<dynamic> data = await getDbsList();
    print('╔════════ databases ════════╗');
    if (data.isNotEmpty){
      for (var item in data) {
        print(item);
      }
    } else {
      print("\t No Databases");
    }
    print('╚════════ databases ════════╝');
  }

  Future<List<dynamic>> getCollectionsList() async{
    State state = await connect();
    if(state == State.open){
      return await _mongoDb.getCollectionNames();
    } else {
      return Future.error(Exception('MongoDB: getCollectionsList() --- db state error: $state'));
    }
  }

  Future<void> showCollections() async {
    List<dynamic> data = await getCollectionsList();
    print('╔════════ collections ════════╗');
    if (data.isNotEmpty){
      for (var item in data) {
        print(item);
      }
    } else {
      print("\t No Collections");
    }
    print('╚════════ collections ════════╝');
  }
}