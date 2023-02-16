import TodoItem from './item/TodoItem'
import { useContext, useState, useMemo } from 'react'
import TodoContext from '../context/TodoContext'
import { motion, AnimatePresence } from 'framer-motion'
import Spinner from './layout/Spinner'

function TodoList() {
	const { todo, isLoading } = useContext(TodoContext)
	const [tab, setTab] = useState('all')
	const [result, setResult] = useState(todo.length)

	const filterTodos = (todos, tab) => {
		const list = todos.filter((todo) => {
			if (tab === 'active') {
				return !todo.isCompleted
			} else if (tab === 'completed') {
				return todo.isCompleted
			} else {
				return true;
			}
		});
		setResult(list.length)
		return list
	}

	const todoList = useMemo(
		() => filterTodos(todo, tab),
		[todo, tab]
	)

	const handleClick = (e) => {
		setTab(e.target.innerText.toLowerCase())
		setResult(todoList.length)
	}
	
	if (!isLoading) {
		return (
			<div className='flex flex-col h-5/6'>
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
