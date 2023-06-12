import PropTypes from "prop-types";
import { RiDeleteBinLine } from "react-icons/ri";

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
          task.completed ? "line-through" : ""
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
        <div className='flex-grow'>
          <h2 className='mr-2' style={{ width: "200px" }}>
            {task.title}
          </h2>
          <p className='text-gray-500 text-sm' style={{ width: "200px" }}>
            {task.description}
          </p>
        </div>
      </article>
      <p className='ml-auto text-gray-500 text-sm flex-shrink-0'>
        {task.completed ? "Completed" : "Pending"}
      </p>
      <button
        onClick={handleDeleteClick}
        className='ml-auto px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex-shrink-0 max-h-8 overflow-hidden'
        aria-label={`Delete task "${task.title}"`}
      >
        <RiDeleteBinLine />
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
