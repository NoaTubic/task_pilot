import 'package:dio/dio.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:task_pilot_client/core/data/clients/api_client.dart';
import 'package:task_pilot_client/core/data/clients/dio_config.dart';
import 'package:uuid/uuid.dart';

// ******** DATA LAYER ********
final apiClientProvider = Provider<ApiClient>(
  (ref) => ApiClient(
    ref.watch(
      dioProvider(
        DioConfig(
          'http://localhost:3000',
          null,
        ),
      ),
    ),
  ),
);

final dioProvider = Provider.family<Dio, DioConfig>((
  ref,
  config,
) {
  final dio = Dio(
    BaseOptions(
      baseUrl: config.baseUrl,
      connectTimeout: const Duration(seconds: 5),
    ),
  )..interceptors.addAll(
      [ref.watch(_prettyDioLoggerProvider)],
    );
  return dio;
});

final uuidProvider = Provider<Uuid>((ref) => Uuid());

final _prettyDioLoggerProvider = Provider<PrettyDioLogger>(
  (_) => PrettyDioLogger(
    requestBody: true,
    requestHeader: true,
    maxWidth: 100,
    compact: false,
  ),
);
