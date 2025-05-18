import '../../models/user.dart';

abstract class UserRepository{
  Future<User> getUserById(String id);
  Future<List<Map<String, dynamic>>> getAllUsers();
  Future<void> addUser(User newUser);
  Future<void> deleteAllUsers();
}
