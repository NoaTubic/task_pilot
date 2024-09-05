import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:q_architecture/base_notifier.dart';
import 'package:task_pilot_client/tasks/di.dart';
import 'package:task_pilot_client/tasks/domain/entities/task.dart';
import 'package:task_pilot_client/tasks/presentation/widgets/header.dart';
import 'package:task_pilot_client/tasks/presentation/widgets/task_dialog.dart';

class TaskPage extends HookConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(taskListNotifierProvider);
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: Header(),
      body: switch (state) {
        BaseInitial<List<Task>>() => const Center(
              child: CircularProgressIndicator(
            color: Colors.black,
          )),
        BaseLoading() => const Center(
            child: CircularProgressIndicator(
              color: Colors.black,
            ),
          ),
        BaseData(data: final tasks) => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Container(
                  color: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),
                      Text(
                        'Uncompleted Tasks',
                        style: Theme.of(context)
                            .textTheme
                            .titleLarge!
                            .copyWith(fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 10),
                      Expanded(
                        child: ListView.separated(
                          itemBuilder: (context, index) {
                            final uncompletedTasks = tasks
                                .where((task) => !task.isCompleted)
                                .toList();
                            final uncompletedTask = uncompletedTasks[index];
                            return ListTile(
                              title: Text(uncompletedTask.title),
                              subtitle: Text(uncompletedTask.description),
                              leading: Checkbox(
                                value: uncompletedTask.isCompleted,
                                onChanged: (value) {
                                  ref
                                      .read(taskNotifierProvider.notifier)
                                      .toggleTaskCompletion(uncompletedTask);
                                },
                              ),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  IconButton(
                                    icon: Icon(
                                      FontAwesomeIcons.penToSquare,
                                      color: Colors.black,
                                    ),
                                    onPressed: () {
                                      showEditTaskDialog(
                                        context,
                                        uncompletedTask.id,
                                        uncompletedTask.title,
                                        uncompletedTask.description,
                                      );
                                    },
                                  ),
                                  IconButton(
                                    icon: Icon(FontAwesomeIcons.trash,
                                        color: Colors.black),
                                    onPressed: () {
                                      ref
                                          .read(taskNotifierProvider.notifier)
                                          .deleteTask(uncompletedTask.id);
                                    },
                                  ),
                                ],
                              ),
                            );
                          },
                          separatorBuilder: (context, index) => const Divider(),
                          itemCount: tasks
                              .where((task) => !task.isCompleted)
                              .toList()
                              .length,
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  color: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),
                      Text(
                        'Completed Tasks',
                        textAlign: TextAlign.left,
                        style: Theme.of(context)
                            .textTheme
                            .titleLarge!
                            .copyWith(fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 10),
                      !(tasks.any((task) => task.isCompleted))
                          ? TextButton(
                              onPressed: () => showCreateTaskDialog(context),
                              child: Text(
                                'No completed tasks yet. Click here to add a new task.',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            )
                          : Expanded(
                              child: ListView.separated(
                                itemBuilder: (context, index) {
                                  final completedTasks = tasks
                                      .where((task) => task.isCompleted)
                                      .toList();

                                  final completedTask = completedTasks[index];
                                  return ListTile(
                                    title: Text(completedTask.title),
                                    subtitle: Text(completedTask.description),
                                    leading: Checkbox(
                                      value: completedTask.isCompleted,
                                      onChanged: (value) {
                                        ref
                                            .read(taskNotifierProvider.notifier)
                                            .toggleTaskCompletion(
                                                completedTask);
                                      },
                                    ),
                                    trailing: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        IconButton(
                                          icon: Icon(FontAwesomeIcons.trash,
                                              color: Colors.black),
                                          onPressed: () {
                                            ref
                                                .read(taskNotifierProvider
                                                    .notifier)
                                                .deleteTask(completedTask.id);
                                          },
                                        ),
                                      ],
                                    ),
                                  );
                                },
                                separatorBuilder: (context, index) =>
                                    const Divider(),
                                itemCount: tasks
                                    .where((task) => task.isCompleted)
                                    .toList()
                                    .length,
                              ),
                            ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ],
          ),
        BaseError<List<Task>>() => Center(
            child: Text('An error occurred. Please try again.'),
          ),
      },
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          showCreateTaskDialog(context);
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
      ),
    );
  }
}
