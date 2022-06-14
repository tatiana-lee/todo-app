import TodoItem from './item/TodoItem'
import { useContext, useEffect, useState } from 'react'
import TodoContext from '../context/TodoContext'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from './layout/Spinner'

function TodoList() {
	const { todo, isLoading } = useContext(TodoContext)
	const [result, setResult] = useState(todo.length)
	const [todoList, setTodoList] = useState(todo)

	const showItems = (filter) => {
		switch (filter) {
			case 'ALL':
				setTodoList(todo)
				return todo.length
			case 'ACTIVE':
				setTodoList(todo.filter((item) => item.isCompleted === false))
				return todo.filter((item) => item.isCompleted === false).length
			case 'COMPLETED':
				setTodoList(todo.filter((item) => item.isCompleted === true))
				return todo.filter((item) => item.isCompleted === true).length
			default:
				return ''
		}
	}
	const handleClick = (e) => {
		setResult(showItems(e.target.innerText))
	}

	useEffect(() => {
		setTodoList(todo)
		setResult(todo.length)
	}, [todo, result, todoList])
	
	if (!isLoading) {
		return (
			<div className='flex flex-col h-4/6'>
				<div className='grid grid-cols-3 gap-2 mb-5'>
					<button className='btn btn-info btn-sm' onClick={handleClick}>
						All
					</button>
					<button className='btn btn-warning btn-sm' onClick={handleClick}>
						Active
					</button>
					<button className='btn btn-success btn-sm' onClick={handleClick}>
						Completed
					</button>
				</div>
				<div className='flex items-center mb-3'>
					<p>
						{result} {result === 1 ? 'item' : 'items'}
					</p>
				</div>

				<div>
					<AnimatePresence>
						{todoList?.map((todo) => (
							<motion.div
								key={todo.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<TodoItem todo={todo} id={todo.id} key={todo.id} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		)
	} else {
		return <Spinner />
	}
}
export default TodoList
