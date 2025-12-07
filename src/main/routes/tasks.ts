import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  // Task list GET
  app.get('/tasks', async (req, res) => {
    try {
      // Receive a list of all existing tasks from the backend
      const response = await axios.get('http://localhost:4000/tasks');
      console.log(response.data);

      res.render('tasks', { tasks: response.data });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('tasks', {});
    }
  });

  // Task creation POST routing
  app.post('/tasks', async (req, res) => {
    // Extract the task details from the form details
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
    };

    // Client side form data validation
    const errors = [];
    if (!task.title.trim()) {
      errors.push({ text: 'Title is required' });
    } else if (task.title.length > 100) {
      errors.push({ text: 'Title must be 100 characters or less' });
    }
    if (task.description.length > 500) {
      errors.push({ text: 'Description must be 500 characters or less' });
    }

    // Reload the form page if there are validation errors
    if (Object.keys(errors).length > 0) {
      return res.render('tasks-new', { errors, task });
    }

    try {
      // Send the POST request to the backend
      const response = await axios.post('http://localhost:4000/tasks', task);
      console.log(response.data);
      // Redirect the user to the page of the newly created task
      res.redirect('/tasks/' + response.data + '?success=true');
    } catch (error) {
      console.error('Error making request:', error);
      res.redirect('/tasks/new');
    }
  });

  // Task creation form GET
  app.get('/tasks/new', async (req, res) => {
    res.render('tasks-new', {});
  });

  // Task information page GET
  app.get('/tasks/:taskId', async (req, res) => {
    try {
      const success = req.query.success === 'true';
      // Get the task information from the backend based on the task id
      const response = await axios.get('http://localhost:4000/tasks/' + req.params.taskId);
      console.log(response.data);

      res.render('tasks-id', {
        task: response.data,
        success,
      });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('tasks-id', {});
    }
  });
}
