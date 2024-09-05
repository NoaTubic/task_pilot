import 'package:json_annotation/json_annotation.dart';

part 'task_request.g.dart';

@JsonSerializable()
class TaskRequest {
  final String title;
  final String description;

  TaskRequest({
    required this.title,
    required this.description,
  });

  factory TaskRequest.fromJson(Map<String, dynamic> json) =>
      _$TaskRequestFromJson(json);

  Map<String, dynamic> toJson() => _$TaskRequestToJson(this);
}
