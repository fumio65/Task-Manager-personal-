import { useState, useEffect } from 'react';
import { validateTaskInput } from '../utils/validation';

const TaskForm = ({ initialData = {}, onSubmit, submitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (initialData.description) setDescription(initialData.description);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateTaskInput({ title, description });
    if (errors) {
      setFieldErrors(errors);
      setFormError('');
      return;
    }

    setFieldErrors({ title: '', description: '' });
    setFormError('');
    onSubmit({ title, description, completed: initialData.completed || false}, setFieldErrors, setFormError);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {fieldErrors.title && <p className="text-red-600 text-sm">{fieldErrors.title}</p>}

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {fieldErrors.description && <p className="text-red-600 text-sm">{fieldErrors.description}</p>}

      {formError && <p className="text-red-600 text-sm">{formError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out 
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
          ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {submitting ? 'Saving...' : 'Save Task'}
      </button>
    </form>
  );
};

export default TaskForm;
