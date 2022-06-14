import { useContext, useEffect, useState } from 'react'
import TodoContext from '../context/TodoContext'
import { toast } from 'react-toastify'


function TodoForm() {
	const { addTodo, todoEdit, updateTodo } = useContext(TodoContext)
	const [text, setText] = useState('')

	useEffect(() => {
		if (todoEdit.edit === true) {
			setText(todoEdit.item.text)
		}
	}, [todoEdit])

	const handleChange = (e) => setText(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (text === '') {
			toast.error('Please enter something', 'error')
		} else {
			text.trim()
			const newTodo = {
				text,
				isCompleted: false,
			}

			if (todoEdit.edit === true) {
				updateTodo(todoEdit.item.id, newTodo)
			} else {
				addTodo(newTodo)
			}
			setText('')
		}
	}

	return (
		<form onSubmit={handleSubmit} className='mb-2' >
			<div className='form-control w-full'>
				<div className='relative flex'>
					<input
						type='text'
						className='input input-md w-full max-w-xs mr-4 bg-gray-200 text-black text-lg'
						placeholder='Add todo'
						value={text}
						id='input'
						onChange={handleChange}
					/>
					<button type='submit' className='btn btn-primary'>
						Add
					</button>
				</div>
			</div>
		</form>
	)
}
export default TodoForm
