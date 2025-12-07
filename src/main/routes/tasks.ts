import { validateTask } from '../utils/task-validator';

import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  /**
   * GET /tasks
   * Retrieves all tasks from the backend and renders the task list view.
   * Falls back to empty list on error.
   */
  app.get('/tasks', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/tasks');
      res.render('tasks', { tasks: response.data });
    } catch (error) {
      res.render('tasks', {});
    }
  });

  /**
   * POST /tasks
   * Validates and creates a new task.
   * Returns validation errors if invalid, redirects to task detail page on success.
   */
  app.post('/tasks', async (req, res) => {
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
    };

    // Validate task data (title required, length limits)
    const errors = validateTask(task);

    // Reload the form page if there are validation errors
    if (Object.keys(errors).length > 0) {
      return res.render('tasks-new', { errors, task });
    }

    try {
      const response = await axios.post('http://localhost:4000/tasks', task);
      // Redirect to newly created task detail page with success flag
      res.redirect('/tasks/' + response.data + '?success=true');
    } catch (error) {
      res.redirect('/tasks/new');
    }
  });

  /**
   * GET /tasks/new
   * Renders the task creation form.
   */
  app.get('/tasks/new', async (req, res) => {
    res.render('tasks-new', {});
  });

  /**
   * GET /tasks/:taskId
   * Retrieves and displays a specific task by ID.
   * Shows success message if coming from task creation.
   */
  app.get('/tasks/:taskId', async (req, res) => {
    try {
      const success = req.query.success === 'true';
      const response = await axios.get('http://localhost:4000/tasks/' + req.params.taskId);

      res.render('tasks-id', {
        task: response.data,
        success,
      });
    } catch (error) {
      res.render('tasks-id', {});
    }
  });
}
