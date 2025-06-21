import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';
import { validateTaskInput } from '../utils/Validation'

const AddTasks = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fieldError, setFieldError] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateTaskInput({ title, description })

    if (errors) {
      setFieldError(errors);
      setFormError('');
      console.log("hi")
      return;
    }

    setSubmitting(true);
    setFieldError({ title: '', description: '' });
    setFormError('');

    try {
      await createTask({ title, description, completed: false })
      navigate('/tasks')
    } catch (error) {
      const response = error?.response?.data;
      const hasError = false

      if (response?.title?.length > 0) {
        setFieldError(prev => ({ ...prev, title: response.title }))
        hasError = true
      }

      if (response?.description?.length > 0) {
        setFieldError(prev => ({ ...prev, description: response.description}))
        hasError = true
      }

      if (errors.message === "Network Error" || !errors.response) {
        setFormError("Server is unreachable. please try again later.")
      } else if (!hasError) {
        setFormError("Failed to add tasks")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Add New Task</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
         type="text"
         className='w-full p-2 border rounded'
         placeholder='Task title'
         value={title}
         onChange={(e) => setTitle(e.target.value)}
        />
        {fieldError && <p className='text-red-600 text-sm'>{fieldError.title}</p>}

        <textarea 
         className='w-full p-2 border rounded'
         placeholder='Description (optional)'
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        />
        {fieldError && <p className='text-red-600 text-sm'>{fieldError.description}</p>}

        {formError && <p className='text-red-600 text-sm'>{formError}</p>}

        <button
         type='submit'
         disabled={submitting}
         className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  )
}

export default AddTasks;