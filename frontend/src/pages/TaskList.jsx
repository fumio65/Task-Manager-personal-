import { useEffect, useState } from 'react';
import { getAllTasks, updateTask } from '../services/api';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        if (err.message === 'Network Error' || !err.response) {
          setError('Server is unreachable. Please try again later.');
        } else {
          setError('Failed to load tasks.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggle = async (taskId, currentStatus) => {
    setStatusMap(prev => ({ ...prev, [taskId]: 'loading' }));
  
    // Optimistic update using functional update
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      )
    );
    try {
      await updateTask(taskId, { completed: !currentStatus });
      setStatusMap(prev => ({ ...prev, [taskId]: 'success' }));
    } catch (err) {
      // Rollback using functional update
      setTasks(prevTasks => 
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: currentStatus } : task
        )
      );
      setStatusMap(prev => ({ ...prev, [taskId]: 'error' }));
      console.error('Toggle failed', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (tasks.length === 0) return <p className="text-center mt-10">No tasks found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} >
            <Link to={`/edit/${task.id}`} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, task.completed)}
                  className="w-4 h-4"
                />
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {statusMap[task.id] === 'loading'
                    ? 'Updating...'
                    : task.completed
                    ? 'Completed'
                    : 'Pending'}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/add" className="block mt-6 text-blue-600 hover:underline">
        + Add another task
      </Link>
    </div>
  );
};

export default TaskList;
