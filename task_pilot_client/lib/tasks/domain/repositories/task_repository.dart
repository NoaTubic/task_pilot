import 'package:q_architecture/q_architecture.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';

abstract interface class TaskRepository {
  EitherFailureOr<List<Task>> getTasks();
  EitherFailureOr<Task> createTask(String title, String description);
  EitherFailureOr<Task> updateTask(
      int id, String title, String description, bool isCompleted);
  EitherFailureOr<void> deleteTask(int id);
}
