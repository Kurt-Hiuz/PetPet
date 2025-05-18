import 'package:grpc/src/server/call.dart';
import 'package:petpet/src/grpcs/generated/test_user/user.pb.dart';
import 'package:petpet/src/grpcs/generated/test_user/user_service.pbgrpc.dart';

class UserService extends UserServiceBase{
  @override
  Future<User> createUser(ServiceCall call, CreateUserRequest request) {
    // TODO: implement deleteUser
    throw UnimplementedError();
  }

  @override
  Future<Empty> deleteUser(ServiceCall call, DeleteUserRequest request) {
    // TODO: implement deleteUser
    throw UnimplementedError();
  }

  @override
  Future<GetAllUsersResponse> getAllUsers(ServiceCall call, Empty request) {
    // TODO: implement getAllUsers
    throw UnimplementedError();
  }

  @override
  Future<User> getUser(ServiceCall call, GetUserRequest request) {
    // TODO: implement getUser
    throw UnimplementedError();
  }

  @override
  Future<User> updateUser(ServiceCall call, UpdateUserRequest request) {
    // TODO: implement updateUser
    throw UnimplementedError();
  }
  
}