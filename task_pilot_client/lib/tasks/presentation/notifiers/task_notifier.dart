import 'package:q_architecture/base_notifier.dart';
import 'package:task_pilot_client/tasks/di.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';
import 'package:task_pilot_client/tasks/domain/repositories/task_repository.dart';

class TaskNotifier extends BaseStateNotifier<void> {
  final TaskRepository _taskRepository;

  TaskNotifier(this._taskRepository, super.ref);

  Future<void> createTask(String title, String description) async {
    execute(
      _taskRepository.createTask(title, description).whenComplete(
          () => ref.read(taskListNotifierProvider.notifier).getTasks()),
    );
  }

  Future<void> updateTask(int id, String title, String description) async {
    execute(
      _taskRepository.updateTask(id, title, description, false).whenComplete(
          () => ref.read(taskListNotifierProvider.notifier).getTasks()),
    );
  }

  Future<void> toggleTaskCompletion(Task task) async {
    execute(
      _taskRepository
          .updateTask(task.id, task.title, task.description, !task.isCompleted)
          .whenComplete(
              () => ref.read(taskListNotifierProvider.notifier).getTasks()),
    );
  }

  Future<void> deleteTask(int id) async {
    execute(
      _taskRepository.deleteTask(id).whenComplete(
          () => ref.read(taskListNotifierProvider.notifier).getTasks()),
    );
  }
}
