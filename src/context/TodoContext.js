import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [todo, setTodo] = useState([])
	const [todoEdit, setTodoEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchTodo()
	}, [])

	const fetchTodo = async () => {
		try {
			const response = await fetch('/todo?_sort=id&_order=desc')
			const data = await response.json()
			setTodo(data)
			setIsLoading(false)
		} catch (error) {
			toast.error(error)
		}
	}

	const addTodo = async (newTodo) => {
		try {
			const response = await fetch('/todo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			})

			const data = await response.json()

			setTodo([data, ...todo])
			toast.success('New Todo added to list')
		} catch (error) {
			toast.error(error)
		}
	}

	const deleteTodo = async (id) => {
		try {
			// if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`/todo/${id}`, { method: 'DELETE' })
			setTodo(todo.filter((item) => item.id !== id))
			toast.success('Todo has been deleted successfully')
			// }
		} catch (error) {
			toast.error(error)
		}
	}

	const updateTodo = async (id, updItem) => {
		try {
			const response = await fetch(`/todo/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updItem),
			})

			const data = await response.json()
			setTodo(
				todo?.map((item) => (item.id === id ? { ...item, ...data } : item))
			)
			toast.warning('Todo updated')
		} catch (error) {
			toast.error(error)
		}
	}

	const editTodo = async (item) => {
		setTodoEdit({
			item,
			edit: true,
		})
	}

	return (
		<TodoContext.Provider
			value={{
				todo,
				isLoading,
				todoEdit,
				addTodo,
				deleteTodo,
				updateTodo,
				editTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}

export default TodoContext
