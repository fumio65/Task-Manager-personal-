// src/pages/EditTask.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask, getTaskById } from '../services/api';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setInitialData(data);
      } catch (error) {
        setError('Failed to load task. Please try again later.')
      } finally {
        setLoading(false);
      }
    }
    fetchTask()
  }, [id]);

  const handleSubmit = async (data, setFieldErrors, setFormError) => {
    setSubmitting(true);
    try {
      await updateTask(id, data)
      navigate('/tasks')
    } catch (error) {
      const response = error?.response?.data;
      let handled = false

      if (response?.title?.length > 0) {
        setFieldErrors(prev => ({ ...prev, title: response.title[0] }));
        handled = true
      }

      if (response?.description?.length > 0) {
        setFieldErrors(prev => ({ ...prev, description: response.description[0] }));
        handled = true
      }

      if (error.message === 'Network Error' || !error.response) {
        setFormError('Server is unreachable, please try again later.');
        return;
      } else if (!handled) {
        setFormError('Failed to update task.')
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default EditTask;
