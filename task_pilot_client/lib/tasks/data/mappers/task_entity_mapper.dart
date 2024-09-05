import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:task_pilot_client/tasks/data/mappers/response_entity_mapper.dart';
import 'package:task_pilot_client/tasks/data/models/task_response.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';

final taskEntityMapperProvider = Provider<ResponseMapper<Task, TaskResponse>>(
  (ref) => (response) => Task(
        id: response.id,
        title: response.title,
        description: response.description,
        isCompleted: response.isCompleted,
      ),
);
