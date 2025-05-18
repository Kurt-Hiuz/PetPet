import 'dart:async';

import 'package:petpet/src/db/dbms/mongo_db/mongo_db.dart';
import 'package:petpet/src/db/models/user.dart';
import 'package:petpet/src/db/patterns/abstract_repositories/user_repository.dart';

class MongoDBUserRepository implements UserRepository{
  final MongoDB _mongoDb;
  final String _titleOfUserCollection = 'user';

  MongoDBUserRepository(this._mongoDb);

  @override
  Future<void> addUser(User newUser) async {
    print("MongoUserRepository: --- add user");
    await _mongoDb.insertOne(newUser.toJson(), _titleOfUserCollection);
  }

  @override
  Future<User> getUserById(String id) async {
    // TODO: implement getUserById
    print("MongoUserRepository: --- get user");
    return User("0", "Name0", "Login0", "email0", "phone0", "password0");
  }

  @override
  Future<List<Map<String, dynamic>>> getAllUsers() async {
    print("MongoUserRepository: --- get all user");
    return await _mongoDb.selectAll(_titleOfUserCollection);
  }

  @override
  Future<void> deleteAllUsers() async {
    await _mongoDb.dropData(_titleOfUserCollection);
  }
}
