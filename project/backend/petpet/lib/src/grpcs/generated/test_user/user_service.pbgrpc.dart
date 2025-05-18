//
//  Generated code. Do not modify.
//  source: user_service.proto
//
// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:grpc/service_api.dart' as $grpc;
import 'package:protobuf/protobuf.dart' as $pb;

import 'user.pb.dart' as $0;

export 'user_service.pb.dart';

@$pb.GrpcServiceName('UserService')
class UserServiceClient extends $grpc.Client {
  static final _$createUser = $grpc.ClientMethod<$0.CreateUserRequest, $0.User>(
      '/UserService/CreateUser',
      ($0.CreateUserRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.User.fromBuffer(value));
  static final _$deleteUser = $grpc.ClientMethod<$0.DeleteUserRequest, $0.Empty>(
      '/UserService/DeleteUser',
      ($0.DeleteUserRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.Empty.fromBuffer(value));
  static final _$updateUser = $grpc.ClientMethod<$0.UpdateUserRequest, $0.User>(
      '/UserService/UpdateUser',
      ($0.UpdateUserRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.User.fromBuffer(value));
  static final _$getUser = $grpc.ClientMethod<$0.GetUserRequest, $0.User>(
      '/UserService/GetUser',
      ($0.GetUserRequest value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.User.fromBuffer(value));
  static final _$getAllUsers = $grpc.ClientMethod<$0.Empty, $0.GetAllUsersResponse>(
      '/UserService/GetAllUsers',
      ($0.Empty value) => value.writeToBuffer(),
      ($core.List<$core.int> value) => $0.GetAllUsersResponse.fromBuffer(value));

  UserServiceClient($grpc.ClientChannel channel,
      {$grpc.CallOptions? options,
      $core.Iterable<$grpc.ClientInterceptor>? interceptors})
      : super(channel, options: options,
        interceptors: interceptors);

  $grpc.ResponseFuture<$0.User> createUser($0.CreateUserRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$createUser, request, options: options);
  }

  $grpc.ResponseFuture<$0.Empty> deleteUser($0.DeleteUserRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$deleteUser, request, options: options);
  }

  $grpc.ResponseFuture<$0.User> updateUser($0.UpdateUserRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$updateUser, request, options: options);
  }

  $grpc.ResponseFuture<$0.User> getUser($0.GetUserRequest request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$getUser, request, options: options);
  }

  $grpc.ResponseFuture<$0.GetAllUsersResponse> getAllUsers($0.Empty request, {$grpc.CallOptions? options}) {
    return $createUnaryCall(_$getAllUsers, request, options: options);
  }
}

@$pb.GrpcServiceName('UserService')
abstract class UserServiceBase extends $grpc.Service {
  $core.String get $name => 'UserService';

  UserServiceBase() {
    $addMethod($grpc.ServiceMethod<$0.CreateUserRequest, $0.User>(
        'CreateUser',
        createUser_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.CreateUserRequest.fromBuffer(value),
        ($0.User value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.DeleteUserRequest, $0.Empty>(
        'DeleteUser',
        deleteUser_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.DeleteUserRequest.fromBuffer(value),
        ($0.Empty value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.UpdateUserRequest, $0.User>(
        'UpdateUser',
        updateUser_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.UpdateUserRequest.fromBuffer(value),
        ($0.User value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.GetUserRequest, $0.User>(
        'GetUser',
        getUser_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.GetUserRequest.fromBuffer(value),
        ($0.User value) => value.writeToBuffer()));
    $addMethod($grpc.ServiceMethod<$0.Empty, $0.GetAllUsersResponse>(
        'GetAllUsers',
        getAllUsers_Pre,
        false,
        false,
        ($core.List<$core.int> value) => $0.Empty.fromBuffer(value),
        ($0.GetAllUsersResponse value) => value.writeToBuffer()));
  }

  $async.Future<$0.User> createUser_Pre($grpc.ServiceCall $call, $async.Future<$0.CreateUserRequest> $request) async {
    return createUser($call, await $request);
  }

  $async.Future<$0.Empty> deleteUser_Pre($grpc.ServiceCall $call, $async.Future<$0.DeleteUserRequest> $request) async {
    return deleteUser($call, await $request);
  }

  $async.Future<$0.User> updateUser_Pre($grpc.ServiceCall $call, $async.Future<$0.UpdateUserRequest> $request) async {
    return updateUser($call, await $request);
  }

  $async.Future<$0.User> getUser_Pre($grpc.ServiceCall $call, $async.Future<$0.GetUserRequest> $request) async {
    return getUser($call, await $request);
  }

  $async.Future<$0.GetAllUsersResponse> getAllUsers_Pre($grpc.ServiceCall $call, $async.Future<$0.Empty> $request) async {
    return getAllUsers($call, await $request);
  }

  $async.Future<$0.User> createUser($grpc.ServiceCall call, $0.CreateUserRequest request);
  $async.Future<$0.Empty> deleteUser($grpc.ServiceCall call, $0.DeleteUserRequest request);
  $async.Future<$0.User> updateUser($grpc.ServiceCall call, $0.UpdateUserRequest request);
  $async.Future<$0.User> getUser($grpc.ServiceCall call, $0.GetUserRequest request);
  $async.Future<$0.GetAllUsersResponse> getAllUsers($grpc.ServiceCall call, $0.Empty request);
}
