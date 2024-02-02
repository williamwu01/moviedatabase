import Nav from './Nav';
import { Link } from 'react-router-dom';
import {appTitles} from '../globals/globals';


const Header = ({handleShowHideNav}) => {

	const closeNav = (e) => {
		if( window.innerWidth < 600){
				handleShowHideNav();
		} else {
				e.target.blur();
		}
	}

	return (
		<header>
			<h1><Link to ="/" >{appTitles}</Link></h1>
			<Nav onClick={closeNav} />
		</header>
	)
}

export default Header