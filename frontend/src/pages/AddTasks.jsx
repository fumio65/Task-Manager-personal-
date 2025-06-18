import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';

const AddTasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()  
    if (!title.trim()) return setError("Title is required")

    setSubmitting(true);
    setError(null);

    try {
      await createTask({ title, description, completed: false })
      navigate('/tasks')
    } catch (error) {
      setError("Failed to add tasks.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto mt-10 bg-whit3 p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Add New Task</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
         type="text"
         className='w-full p-2 border rounded'
         placeholder='Task title'
         value={title}
         onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea
         className='w-full p-2 border rounded'
         placeholder='Description (optional)'
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className='text-red-600 text-sm'>{error}</p>}
        <button
         type='submit'
         disabled={submitting}
         className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          {submitting ? "Adding..." : 'Add Task'}
        </button>
      </form>
    </div>
  )
}

export default AddTasks;