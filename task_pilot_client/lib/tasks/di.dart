// ******** DATA LAYER ********
import 'package:q_architecture/base_notifier.dart';
import 'package:task_pilot_client/core/di.dart';
import 'package:task_pilot_client/tasks/data/mappers/task_entity_mapper.dart';
import 'package:task_pilot_client/tasks/data/repositories/task_repository_impl.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';
import 'package:task_pilot_client/tasks/domain/repositories/task_repository.dart';

import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:task_pilot_client/tasks/presentation/notifiers/task_list_notifier.dart';
import 'package:task_pilot_client/tasks/presentation/notifiers/task_notifier.dart';

final taskRepositoryProvider = Provider<TaskRepository>(
  (ref) => TaskRepositoryImpl(
    ref.watch(apiClientProvider),
    ref.watch(taskEntityMapperProvider),
  ),
);

// ***** PRESENTATION LAYER ******

final taskListNotifierProvider =
    BaseStateNotifierProvider<TaskListNotifier, List<Task>>(
  (ref) => TaskListNotifier(
    ref,
    ref.watch(taskRepositoryProvider),
  )..getTasks(),
);

final taskNotifierProvider = BaseStateNotifierProvider<TaskNotifier, void>(
  (ref) => TaskNotifier(
    ref.watch(taskRepositoryProvider),
    ref,
  ),
);
