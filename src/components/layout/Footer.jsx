import { FaGithub } from 'react-icons/fa'

function Footer() {
	return (
		<div className='flex h-14 p-4'>
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
