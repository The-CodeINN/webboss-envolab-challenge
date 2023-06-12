import PropTypes from 'prop-types';

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  const handleCheckboxChange = () => {
    onToggleTask(task.id);
  };

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className='flex'>
      <article
        className={`flex items-center mb-2 ${
          task.completed ? 'line-through' : ''
        }`}
        key={task.id}
        role='listitem'
      >
        <input
          type='checkbox'
          checked={task.completed}
          onChange={handleCheckboxChange}
          className='mr-2'
          aria-label={`Mark task "${task.title}" as completed`}
        />
        <h2 className='mr-2'>{task.title}</h2>
        <p className='text-gray-500 text-sm'>{task.description}</p>
      </article>
      <p className='ml-auto text-gray-500 text-sm'>
        {task.completed ? 'Completed' : 'Pending'}
      </p>
      <button
        onClick={handleDeleteClick}
        className='ml-auto px-4 py-2 bg-red-500 text-white rounded'
        aria-label={`Delete task "${task.title}"`}
      >
        Delete
      </button>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
