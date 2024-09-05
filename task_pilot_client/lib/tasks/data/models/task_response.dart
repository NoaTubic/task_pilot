import 'package:json_annotation/json_annotation.dart';

part 'task_response.g.dart';

@JsonSerializable()
class TaskResponse {
  final int id;
  final String title;
  final String description;
  final bool isCompleted;

  TaskResponse({
    required this.id,
    required this.title,
    required this.isCompleted,
    required this.description,
  });

  factory TaskResponse.fromJson(Map<String, dynamic> json) =>
      _$TaskResponseFromJson(json);

  Map<String, dynamic> toJson() => _$TaskResponseToJson(this);
}
