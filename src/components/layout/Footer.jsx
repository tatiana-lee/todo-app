import { FaGithub } from 'react-icons/fa'

function Footer() {
	return (
		<div className='flex items-center justify-center h-14'>
			<a
				href='https://github.com/tatiana-lee'
				target='_blank'
        rel="noreferrer"
				className='text-xl'
			>
				<FaGithub /> 
			</a>
		</div>
	)
}
export default Footer
