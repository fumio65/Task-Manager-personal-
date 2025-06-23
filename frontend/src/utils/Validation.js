export const validateTaskInput = ({ title, description }) => {
  const errors = {
    title: '',
    description: ''
  }

  const trimmedTitle = title.trim();
  let hasError = false

  if (!trimmedTitle) {
    errors.title = 'Title is required.'
    hasError = true
  } else if (trimmedTitle.length < 5) {
    errors.title = 'Title must be at least 5 characters long.'
    hasError = true
  } else if (trimmedTitle.length > 100) {
    errors.title = 'Title is too long (max 100 characters).'
    hasError = true
  }

  if (description && description.length > 300) {
    errors.description = 'Description is too long (max 300 characters).'
    hasError = true
  }

  return hasError ? errors : null;
}