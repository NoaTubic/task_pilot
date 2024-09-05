import 'package:dio/dio.dart';
import 'package:retrofit/http.dart';
import 'package:task_pilot_client/tasks/data/models/task_request.dart';
import 'package:task_pilot_client/tasks/data/models/task_response.dart';

part 'api_client.g.dart';

@RestApi()
abstract class ApiClient {
  factory ApiClient(Dio dio) = _ApiClient;

  @GET("/tasks")
  Future<List<TaskResponse>> getTasks();

  @POST("/tasks")
  Future<TaskResponse> createTask(@Body() TaskRequest task);

  @PUT("/tasks/{id}")
  Future<TaskResponse> updateTask(
      @Path("id") int id, @Body() TaskResponse task);

  @DELETE("/tasks/{id}")
  Future<void> deleteTask(@Path("id") int id);
}
