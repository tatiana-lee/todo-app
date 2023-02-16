import { TodoProvider } from './context/TodoContext'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<>
			<TodoProvider>
				<div className='flex flex-col justify-between items-center h-screen'>
					<Header className='flex-none' />
					<TodoForm className='flex-none' />
					<TodoList className='flex overflow-auto' />
					<Footer className='flex-none' />
				</div>
			</TodoProvider>
			<ToastContainer autoClose={2000} theme='dark' />
		</>
	)
}

export default App
