import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteHandlerContext, EditHandlerContext } from "../App";
import { useEffect } from "react";


const TaskItem = ({ task, handleEditSubmitter, editedText, setEditedText }) => {
 const [isChecked, setIsChecked] = useState(() => {
  // Get the initial value from local storage or set it to false
  const saved = localStorage.getItem(`task-${task.id}`);
  const initialValue = JSON.parse(saved);
  return initialValue || false;
});

useEffect(() => {
  // Save the isChecked state to local storage whenever it changes
  localStorage.setItem(`task-${task.id}`, JSON.stringify(isChecked));
}, [isChecked, task.id]);
  
  const handleDelete = useContext(DeleteHandlerContext);
  const handleEdit = useContext(EditHandlerContext);

  return (
    <div className='task-item flex justify-between items-center bg-gradient-to-r from-gray-800 to-slate-800 p-5 rounded hover:from-teal-900 hover:to-gray-800 group'>
      <div className='task-item-left flex gap-3'>
        <span className='self-center'>
          
        <input
  type='checkbox'
  className='accent-teal-400 cursor-pointer'
  checked={isChecked}
  onChange={async () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/updateCompleted/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: task.todo,
        completed: !newCheckedStatus,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  }}
/>


        </span>

        {task.isEditable && (
          
          <form onSubmit={(e) => handleEditSubmitter(e, task.id)}>
<input
  className='bg-transparent outline-none border-b-2 border-gray-500 pb-1 w-full focus:border-teal-500'
  type='text'
  required
  value={editedText}
  onChange={(e) => setEditedText(e.target.value)}
/>
          </form>
        )}

{!task.isEditable && (
  <div
    className={`group-hover:text-teal-400 ${
      isChecked
        ? "line-through text-gray-500 group-hover:text-teal-600"
        : null
    }`}
  >
    <div>
      <span>{task.todo}</span>
      <p><small>{task.createdAt}</small></p>
    </div>
  </div>
)}
      </div>

      <div className='task-item-right flex gap-3 text-gray-500'>
        <button onClick={() => handleEdit(task.id)}>
          <FiEdit className='cursor-pointer hover:text-teal-400 duration-300' />
        </button>
        <button onClick={() => handleDelete(task.id)}>
  <FiTrash className='cursor-pointer hover:text-rose-500 duration-300' />
</button>
      </div>
    </div>
  );
};

export default TaskItem;