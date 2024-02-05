import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className='header'>
        <NavLink to="/" className="w-10 rounded-lg bg-white items-center justify-center font-bold flex shadom-md">
        <p className='blue-gradient_text'>EK</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({isActive})=> isActive ? 'text-blue-500': 'text-black'} >
            About
        </NavLink>
        <NavLink to='/contact' className={({isActive})=> isActive ? 'text-blue-500': 'text-black'} >
            Contact
        </NavLink>
        <NavLink to='/projects' className={({isActive})=> isActive ? 'text-blue-500': 'text-black'} >
            Projects
        </NavLink>
        </nav>
    </header>
  )
}

export default Navbar