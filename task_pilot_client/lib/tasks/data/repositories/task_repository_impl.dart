import 'package:either_dart/either.dart';
import 'package:q_architecture/q_architecture.dart';
import 'package:task_pilot_client/core/data/clients/api_client.dart';
import 'package:task_pilot_client/tasks/data/mappers/response_entity_mapper.dart';
import 'package:task_pilot_client/tasks/data/models/task_request.dart';
import 'package:task_pilot_client/tasks/data/models/task_response.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';
import 'package:task_pilot_client/tasks/domain/repositories/task_repository.dart';

class TaskRepositoryImpl implements TaskRepository {
  final ApiClient _apiClient;
  final ResponseMapper<Task, TaskResponse> _taskMapper;

  TaskRepositoryImpl(this._apiClient, this._taskMapper);

  @override
  EitherFailureOr<Task> createTask(
    String title,
    String description,
  ) async {
    try {
      final response = await _apiClient.createTask(
        TaskRequest(
          title: title,
          description: description,
        ),
      );
      return Right(Task(
          id: response.id,
          title: title,
          description: response.description,
          isCompleted: response.isCompleted));
    } catch (_) {
      return Left(Failure.generic());
    }
  }

  @override
  EitherFailureOr<void> deleteTask(int id) async {
    try {
      _apiClient.deleteTask(id);
      return Right(null);
    } catch (_) {
      return Left(Failure.generic());
    }
  }

  @override
  EitherFailureOr<List<Task>> getTasks() async {
    try {
      final response = await _apiClient.getTasks();
      final tasks = response.map((e) => _taskMapper(e)).toList();
      return Right(tasks);
    } catch (_) {
      return Left(Failure.generic());
    }
  }

  @override
  EitherFailureOr<Task> updateTask(
      int id, String title, String description, bool isCompleted) async {
    try {
      final response = await _apiClient.updateTask(
        id,
        TaskResponse(
          id: id,
          title: title,
          description: description,
          isCompleted: isCompleted,
        ),
      );
      return Right(_taskMapper(response));
    } catch (_) {
      return Left(Failure.generic());
    }
  }
}
