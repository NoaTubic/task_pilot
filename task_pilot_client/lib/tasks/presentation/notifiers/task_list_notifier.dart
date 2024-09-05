import 'package:q_architecture/base_notifier.dart';

import 'package:task_pilot_client/tasks/domain/entities/task.dart';
import 'package:task_pilot_client/tasks/domain/repositories/task_repository.dart';

class TaskListNotifier extends BaseStateNotifier<List<Task>> {
  final TaskRepository _taskRepository;
  TaskListNotifier(super.ref, this._taskRepository);

  Future<void> getTasks() async {
    execute(_taskRepository.getTasks());
  }
}
