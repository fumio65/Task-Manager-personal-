import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask, getTaskById, getAllTasks } from '../services/api';
import { validateTaskInput } from '../utils/validation';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const task = await getTaskById(id);
        setTitle(task.title);
        setDescription(task.description);
      } catch (error) {
        setFormError("Failed to load task.")
      } finally {
        setLoading(false);
      }
    }
    fetchTasks()
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateTaskInput({ title, description });
    if (errors) {
      setFieldErrors(errors);
      setFormError("");
      return;
    }

    setSubmitting(true);
    setFieldErrors({ title: '', description: '' });
    setFormError('');

    try {
      await updateTask(id, { title, description })
      navigate('/tasks')
    } catch (error) {
      const response = error?.response?.data;
      const handled = false;

      if (response?.title?.length > 0) {
        setFieldErrors(prev => ({ ...prev, title: response.title }));
        handled = true;
      } 

      if (response?.description?.length > 0) {
        setFieldErrors(prev => ({ ...prev, description: response.description }));
        handled = true;
      }

      if (error.message === 'Network Error' || !error.response) {
        setFormError("Server is unreachable, please try again later.")
      } else if (!handled) {
        setFormError('Failed to update task.')
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading task...</p>;

  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Edit Task</h1>

      <form onSubmit={handleSubmit} className='space-y-4' noValidate>
        <input
          type="text"
          className='w-full p-2 border rounded'
          placeholder='Task title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {fieldErrors.title && <p className='text-red-600 text-sm'>{fieldErrors.title}</p>}

        <textarea
          className='w-full p-2 border rounded'
          placeholder='Description (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {fieldErrors.description && <p className='text-red-600 text-sm'>{fieldErrors.description}</p>}

        {formError && <p className='mt-2 text-red-600 text-sm'>{formError}</p>}

        <button
          type='submit'
          disabled={submitting}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          {submitting ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
