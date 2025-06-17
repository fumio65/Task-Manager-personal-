const TaskCard = ({ task }) => {
  return(
    <div className="bg-white rounded-xl shadow p-4 border flex justify-between items-center">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">{task.title}</h1>
        {task.description && (
          <p className="text-gray-500 text-sm">{task.description}</p>
        )}
      </div>
      <span
       className={`text-xs font-medium px-2 py-2 rounded-full ${
        task.completed 
        ? 'bg-green-100 text-green-700'
        : 'bg-yellow-100 text-yellow-700'
       }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>
    </div>
  )
}

export default TaskCard;