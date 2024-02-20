import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
// import Header from './Header';



const Nav = () => {

	const [showNav, setShowNav] = useState(false);

	const toggleNav = () => {
    console.log('toggleNav');
    setShowNav(!showNav);
  }

	const isDesktop = (e) => {
		console.log(e);
		if (e.matches) {
      setShowNav(false);
    }
	}

	// useEffect(() => {
  //   let mediaQuery = window.matchMedia('(min-width:600px)')
	// 	mediaQuery.addEventListener('change', isDesktop);

	// 	return () => mediaQuery.removeEventListener('change', isDesktop);
	// }, []);

  return (
    <>
      <nav className= {showNav ? 'show' : ''}>
        <ul className='main-nav'>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/favourites">Favourites</NavLink></li>
        </ul>
      </nav>
			 <nav className= {showNav? 'show': ''}>
        <ul className='desktop-nav' >
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/favourites">Favourites</NavLink></li>
        </ul>
      </nav>
			<label className="menubutton" onClick={toggleNav}>
        <input type="checkbox" id="check" onClick={(e)=>e.stopPropagation()}/>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </label>
			{/* <Header handleShowHideNav={toggleNav}/> */}
    </>
  );
}

export default Nav;