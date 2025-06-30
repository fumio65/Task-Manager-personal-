import { useEffect, useState } from 'react';
import { getAllTasks, updateTask, deleteTask } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const navigate = useNavigate();

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

    setTasks(prev => 
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      )
    );

    try {
      await updateTask(taskId, { completed: !currentStatus });
      setStatusMap(prev => ({ ...prev, [taskId]: 'success' }));
    } catch (error) {
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, completed: currentStatus } : task
        )
      )
      setStatusMap(prev => ({ ...prev, [taskId]: 'error' }));

      console.error('Toggle failed', error);
    }
  }

  const handleDelete = async (taskId) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete task.');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = 
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed)
    return matchSearch && matchStatus;
  });

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {/* Search & Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto flex-1"
        />

        <div className="flex gap-2">
          {['all', 'completed', 'pending'].map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-1 rounded border ${
                filter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      { filteredTasks === 0 ? (
        <p className="text-center text-gray-500 italic">No matching tasks.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className="border p-4 rounded flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/edit/${task.id}`)}
              >
                <h2 className="font-semibold">{task.title}</h2>
                {task.description && (
                  <p className="text-sm text-gray-600">{task.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, task.completed)}
                  className="w-4 h-4"
                />
                <span
                  className={`text-xs px-2 py-1 rounded transition ${
                    task.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {statusMap[task.id] === 'loading'
                    ? 'Updating...'
                    : task.completed
                    ? 'Completed'
                    : 'Pending'}
                </span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 text-sm hover:underline ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      

      <Link to="/add" className="block mt-6 text-blue-600 hover:underline">
        + Add another task
      </Link>
    </div>
  );
};

export default TaskList;
