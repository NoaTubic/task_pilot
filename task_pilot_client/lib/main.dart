import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:task_pilot_client/core/domain/utils/custom_provider_observer.dart';
import 'package:task_pilot_client/tasks/presentation/pages/task_page.dart';

void main() {
  runApp(
    ProviderScope(
      observers: [CustomProviderObserver()],
      child: TaskManagerApp(),
    ),
  );
}

class TaskManagerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Task Manager',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: TaskPage(),
    );
  }
}
