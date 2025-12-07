import { Task, isValidTask, validateTask } from '../../main/utils/task-validator';

describe('Task Validator', () => {
  describe('validateTask', () => {
    describe('title validation', () => {
      test('should reject empty title', () => {
        const task: Task = {
          title: '',
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(1);
        expect(errors[0].text).toBe('Title is required');
      });

      test('should reject whitespace-only title', () => {
        const task: Task = {
          title: '   ',
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(1);
        expect(errors[0].text).toBe('Title is required');
      });

      test('should reject title over 100 characters', () => {
        const task: Task = {
          title: 'a'.repeat(101),
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(1);
        expect(errors[0].text).toBe('Title must be 100 characters or less');
      });

      test('should accept title of exactly 100 characters', () => {
        const task: Task = {
          title: 'a'.repeat(100),
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });

      test('should accept valid title', () => {
        const task: Task = {
          title: 'Valid Task Title',
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });

      test('should accept title with leading/trailing whitespace after trim', () => {
        const task: Task = {
          title: '  Valid Task Title  ',
          description: 'Valid description',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });
    });

    describe('description validation', () => {
      test('should allow empty description', () => {
        const task: Task = {
          title: 'Valid Title',
          description: '',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });

      test('should reject description over 500 characters', () => {
        const task: Task = {
          title: 'Valid Title',
          description: 'a'.repeat(501),
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(1);
        expect(errors[0].text).toBe('Description must be 500 characters or less');
      });

      test('should accept description of exactly 500 characters', () => {
        const task: Task = {
          title: 'Valid Title',
          description: 'a'.repeat(500),
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });

      test('should accept valid description', () => {
        const task: Task = {
          title: 'Valid Title',
          description: 'This is a valid task description with some details about what needs to be done.',
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(0);
      });
    });

    describe('multiple validation errors', () => {
      test('should return multiple errors for empty title and long description', () => {
        const task: Task = {
          title: '',
          description: 'a'.repeat(501),
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(2);
        expect(errors[0].text).toBe('Title is required');
        expect(errors[1].text).toBe('Description must be 500 characters or less');
      });

      test('should return multiple errors for long title and long description', () => {
        const task: Task = {
          title: 'a'.repeat(101),
          description: 'a'.repeat(501),
          status: 'Completed',
          dueDate: '2024-12-31T20:00',
        };

        const errors = validateTask(task);

        expect(errors).toHaveLength(2);
        expect(errors[0].text).toBe('Title must be 100 characters or less');
        expect(errors[1].text).toBe('Description must be 500 characters or less');
      });
    });
  });

  describe('isValidTask', () => {
    test('should return true for valid task', () => {
      const task: Task = {
        title: 'Valid Task',
        description: 'Valid description',
        status: 'Completed',
        dueDate: '2024-12-31T20:00',
      };

      expect(isValidTask(task)).toBe(true);
    });

    test('should return false for task with empty title', () => {
      const task: Task = {
        title: '',
        description: 'Valid description',
        status: 'Completed',
        dueDate: '2024-12-31T20:00',
      };

      expect(isValidTask(task)).toBe(false);
    });

    test('should return false for task with long description', () => {
      const task: Task = {
        title: 'Valid Title',
        description: 'a'.repeat(501),
        status: 'Completed',
        dueDate: '2024-12-31T20:00',
      };

      expect(isValidTask(task)).toBe(false);
    });

    test('should return false for task with multiple validation errors', () => {
      const task: Task = {
        title: '',
        description: 'a'.repeat(501),
        status: 'Completed',
        dueDate: '2024-12-31T20:00',
      };

      expect(isValidTask(task)).toBe(false);
    });
  });
});
