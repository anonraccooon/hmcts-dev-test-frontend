export interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface ValidationError {
  text: string;
}

/**
 * Validates task input data
 * @param task - The task object to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateTask(task: Task): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate title
  if (!task.title || !task.title.trim()) {
    errors.push({ text: 'Title is required' });
  } else if (task.title.length > 100) {
    errors.push({ text: 'Title must be 100 characters or less' });
  }

  // Validate description
  if (task.description && task.description.length > 500) {
    errors.push({ text: 'Description must be 500 characters or less' });
  }

  return errors;
}

/**
 * Check if task data is valid
 * @param task - The task object to validate
 * @returns true if task is valid, false otherwise
 */
export function isValidTask(task: Task): boolean {
  return validateTask(task).length === 0;
}
