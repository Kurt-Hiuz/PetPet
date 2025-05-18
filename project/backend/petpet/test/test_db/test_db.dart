import 'dart:async';

import 'package:petpet/src/db/dbms/mongo_db/mongo_db.dart';
import 'package:petpet/src/db/dbms/mongo_db/repository/mongodb_user_repository.dart';
import 'package:petpet/src/db/models/user.dart';

class TestDb {
  Future<String> testClearAddSelect() async {
    MongoDB mongo = MongoDB();
    // await mongo.showDbs();
    // await mongo.showCollections();
  
    MongoDBUserRepository mongoUserRepository = MongoDBUserRepository(mongo);

    await mongoUserRepository.deleteAllUsers();
    User newUser = User("1", "userName1", "userLogin1", "userEmail1", "userPhone1", "userHashPassword1");
    await mongoUserRepository.addUser(newUser);
    List<Map<String, dynamic>> allUsers = await mongoUserRepository.getAllUsers();

      print('╔════════ Users (${allUsers.length}) ═════════');
      if (allUsers.isNotEmpty){
        for (var item in allUsers) {
          print(item);
        }
      } else {
        print("\t No Users");
      }
      print('╚════════ Users ═════════════');
    return Future.value("Test complited");
  }
}