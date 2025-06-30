import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';
import TaskForm from '../components/TaskForm';
import toast from 'react-hot-toast';

const AddTasks = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data, setFieldErrors, setFormError) => {
    setSubmitting(true);
    try {
      await createTask(data);
      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (err) {
      const response = err?.response?.data;
      let handled = false;

      if (response?.title?.length > 0) {
        setFieldErrors(prev => ({ ...prev, title: response.title[0] }));
        handled = true;
      }

      if (response?.description?.length > 0) {
        setFieldErrors(prev => ({ ...prev, description: response.description[0] }));
        handled = true;
      }

      if (err.message === 'Network Error' || !err.response) {
        setFormError('Server is unreachable. Please try again later.');
      } else if (!handled) {
        setFormError('Failed to add task.');
      }

      toast.error('Failed to create task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-4'>Add New Task</h1>
      <TaskForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default AddTasks;