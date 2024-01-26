import { NavLink } from 'react-router-dom';


const Nav = () => {
	return (
		<nav>
			<ul>
			<li><NavLink to="/about">About</NavLink></li>
			<li><NavLink to="/" >Home</NavLink></li>
			<li><NavLink to="/Catagory">Catagory</NavLink></li>
			<li><NavLink to="/favourites">Favourites</NavLink></li>
			</ul>
		</nav>
	)
}

export default Nav