import 'package:dio/dio.dart';

class DioConfig {
  final String baseUrl;
  final QueuedInterceptor? interceptor;

  DioConfig(this.baseUrl, this.interceptor);
}
