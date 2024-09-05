import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:task_pilot_client/tasks/di.dart';

class CreateTaskDialog extends ConsumerStatefulWidget {
  final String? title;
  final String? description;

  const CreateTaskDialog({Key? key, this.title, this.description})
      : super(key: key);

  @override
  _CreateTaskDialogState createState() => _CreateTaskDialogState();
}

class _CreateTaskDialogState extends ConsumerState<CreateTaskDialog> {
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.title);
    _descriptionController = TextEditingController(text: widget.description);
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        'Add Task',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      content: SizedBox(
        width: 400,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(
                labelText: 'Title',
                labelStyle: TextStyle(color: Colors.black),
              ),
              style: TextStyle(color: Colors.black),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(
                labelText: 'Description',
                labelStyle: TextStyle(color: Colors.black),
              ),
              style: TextStyle(color: Colors.black),
              maxLines: 5,
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('Cancel',
              style: TextStyle(
                color: Colors.black,
              )),
        ),
        ElevatedButton(
          onPressed: () {
            String title = _titleController.text;
            String description = _descriptionController.text;
            ref
                .read(taskNotifierProvider.notifier)
                .createTask(title, description);
            Navigator.of(context).pop();
          },
          child: Text(
            'Add',
            style: TextStyle(
              color: Colors.black,
            ),
          ),
        ),
      ],
    );
  }
}

class EditTaskDialog extends ConsumerStatefulWidget {
  final int id;
  final String? title;
  final String? description;

  const EditTaskDialog(this.id, {Key? key, this.title, this.description})
      : super(key: key);

  @override
  _EditTaskDialogState createState() => _EditTaskDialogState();
}

class _EditTaskDialogState extends ConsumerState<EditTaskDialog> {
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.title);
    _descriptionController = TextEditingController(text: widget.description);
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        'Edit Task',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
      content: SizedBox(
        width: 400,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(
                labelText: 'Title',
                labelStyle: TextStyle(color: Colors.black),
              ),
              style: TextStyle(color: Colors.black),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(
                labelText: 'Description',
                labelStyle: TextStyle(color: Colors.black),
              ),
              style: TextStyle(color: Colors.black),
              maxLines: 5,
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('Cancel',
              style: TextStyle(
                color: Colors.black,
              )),
        ),
        ElevatedButton(
          onPressed: () {
            String title = _titleController.text;
            String description = _descriptionController.text;
            ref
                .read(taskNotifierProvider.notifier)
                .updateTask(widget.id, title, description);
            Navigator.of(context).pop();
          },
          child: Text(
            'Save',
            style: TextStyle(
              color: Colors.black,
            ),
          ),
        ),
      ],
    );
  }
}

class TaskDialog extends StatelessWidget {
  final int? id;
  final String? title;
  final String? description;
  final bool isEditing;

  const TaskDialog(
      {Key? key, this.title, this.description, this.isEditing = false, this.id})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return isEditing
        ? EditTaskDialog(id!, title: title, description: description)
        : CreateTaskDialog(title: title, description: description);
  }
}

void showCreateTaskDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return TaskDialog();
    },
  );
}

void showEditTaskDialog(
    BuildContext context, int id, String title, String description) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return TaskDialog(
        id: id,
        title: title,
        description: description,
        isEditing: true,
      );
    },
  );
}
