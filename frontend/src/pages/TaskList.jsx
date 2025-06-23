import { useEffect, useState } from 'react';
import { getAllTasks } from '../services/api';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        if (error.message === 'Network Error' || !error.response) {
          setError("Server is unreachable, please try again later.");
          return;
        } else {
          setError("Failed to add task.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAllTask();
  }, [])


  if (loading) return <p className='text-center mt-10'>Loading tasks...</p>;

  if (error) return <p className='text-red-600 text-center mt-10'>{error}</p>;

  if (tasks.length === 0) return <p className='text-center mt-10'>No task found.</p>;

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
      <h1 className='tex-2xl font-bold mb-6'>All Tasks</h1>

      <ul className='space-y-4'>
        {tasks.map(task => (
          <li key={task.id} className='border p-4 rounded flex justify-between items-center'>
            <div>
              <h2 className='font-semibold'>{task.title}</h2>
              {task.description && <p className='text-sm text-gray-600'>{task.description}</p>}
            </div>
            <span className={`text-xs px-2 py-1 rounded ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>

      <Link to='/add' className='block mt-6 text-blue-600 hover:underline'>+ Add another task</Link>
    </div>
  );
};

export default TaskList;