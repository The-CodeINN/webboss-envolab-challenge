import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskItem from './components/TaskItem';
import { getTodoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './helpers/helpers';

const App = () => {
  const [tasks, setTasks] = useState(getTodoItemsFromLocalStorage('tasks'));
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleInputChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  const handleDescriptionChange = useCallback((event) => {
    setNewTaskDescription(event.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTask.trim() !== '') {
      const existingTask = tasks.find((task) => task.title === newTask);
      if (existingTask) {
        alert('Task with the same title already exists.');
        return;
      }
      const updatedTasks = [
        ...tasks,
        {
          id: uuidv4(),
          title: newTask,
          description: newTaskDescription,
          completed: false,
        },
      ];
      setTasks(updatedTasks);
      setNewTask('');
      setNewTaskDescription('');
      saveTodoItemsToLocalStorage('tasks', updatedTasks);
    } else {
      alert('Task title cannot be empty.');
    }
  }, [newTask, newTaskDescription, tasks]);

  const handleToggleTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      saveTodoItemsToLocalStorage('tasks', updatedTasks);
      return updatedTasks;
    });
  }, []);

  const handleDeleteTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      saveTodoItemsToLocalStorage('tasks', updatedTasks);
      return updatedTasks;
    });
  }, []);

  return (
    <div className='container max-w-2xl px-6 py-6 mx-auto font-figTree'>
      <h1 className='text-3xl font-bold mb-4'>Todo App</h1>
      <div className='mb-4'>
        <input
          type='text'
          value={newTask}
          onChange={handleInputChange}
          placeholder='Enter a new task'
          className='p-2 border border-gray-300 rounded'
          aria-label='Enter a new task'
        />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          value={newTaskDescription}
          onChange={handleDescriptionChange}
          placeholder='Enter task description'
          className='p-2 border border-gray-300 rounded'
          aria-label='Enter task description'
        />
      </div>
      <button
        onClick={handleAddTask}
        className='px-4 py-2 bg-blue-500 text-white rounded mb-8'
      >
        Add Task
      </button>
      <ul className='list-none mb-3'>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={() => handleToggleTask(task.id)}
            onDeleteTask={() => handleDeleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
