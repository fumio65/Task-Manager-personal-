import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';
import TaskForm from '../components/TaskForm';

const AddTasks = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data, setFieldErrors, setFormError) => {
    setSubmitting(true);
    try {
      await createTask(data);
      navigate('/tasks')
    } catch (error) {
      const response = error?.response?.data;
      let handled = false;

      if (response?.title?.length > 0) {
        setFieldErrors(response.title[0]);
        handled = true;
      }

      if (response?.description?.length > 0) {
        setFieldErrors(response.description[0]);
        handled = true;
      }

      if (error.message === 'Network Error' || !error.response) {
        setFormError("Server is unreachable, please try again later.");
        return;
      } else if (!handled) {
        setFormError('Failed to add task.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Add New Task</h1>
      <TaskForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default AddTasks;