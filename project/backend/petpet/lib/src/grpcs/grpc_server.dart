import 'package:grpc/grpc.dart';
import 'package:petpet/src/grpcs/services/user/user_service.dart';

class GrpcServer {
  final _server = Server.create(services: [UserService()]);
  
  Future<void> start() async {
    try {
      await _server.serve();
      print("gRPC сервер запущен");
    } catch (error) {
      print("Ошибка gRPC сервер: $error");
    }
      
  }
}