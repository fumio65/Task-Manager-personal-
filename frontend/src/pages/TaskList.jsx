import { useState, useEffect } from 'react';
import { fetchTasks } from '../services/api'
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
    .then((res) => {
      setTasks(res.data)
      setLoading(false)
    })
    .catch((err) => {
      setError("Failed to fetch data")
      setLoading(false)
    })
  }, []);

  if (loading) return <p className='text-center mt-10'>Task Loading...</p>
  if (error) return <p className='text-center text-red-500 mt-10'>{error}</p>
  if (tasks.length === 0) return <p className='text-center mt-10'>No tasks yet.</p>

  return(
    <div className='p-6 max-w-2xl mx-auto space-y-4'>
      <Link
       to='/add'
       className='border inline-block bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition duration-300 ease-in-out'
      >
        + Add Task
      </Link>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList;