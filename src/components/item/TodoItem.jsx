import { useContext } from 'react'
import { FaTrash, FaRegEdit, FaRegCheckCircle } from 'react-icons/fa'
import TodoContext from '../../context/TodoContext'

function TodoItem({ todo }) {
	const { deleteTodo, editTodo, updateTodo } = useContext(TodoContext)

	const completeTodo = () => {
		let check = !todo.isCompleted ? true : false
		const upd = {
			text: todo.text,
			isCompleted: check,
		}
		updateTodo(todo.id, upd)
	}
	const handleEdit = () => {
		editTodo(todo)
		let inputEl = document.getElementById('input')
		inputEl.focus()
	}

	return (
		<div className='flex mb-2 bg-gray-800 rounded-xl shadow-md' id={todo.id}>
			<div className='flex-none'>
				<button className='btn btn-ghost text-green ' onClick={completeTodo}>
					<FaRegCheckCircle className={todo.isCompleted ? 'fill-green-500' : ''}/>
				</button>
			</div>
			<div className='flex w-64 items-center'>
				<p className={todo.isCompleted ? 'line-through text-gray-700' : ''}>{todo.text}</p>
			</div>
			<div className='flex-none'>
				<button className='btn btn-ghost' onClick={handleEdit}>
					<FaRegEdit />
				</button>
			</div>
			<div className='flex-none'>
				<button onClick={() => deleteTodo(todo.id)} className='btn btn-ghost'>
					<FaTrash />
				</button>
				
			</div>
		</div>
	)
}
export default TodoItem
