import Nav from './Nav';
import { Link } from 'react-router-dom';
import {appTitles} from '../globals/globals';


const Header = () => {

	return (
		<header>
			<h1><Link to ="/">{appTitles}</Link></h1>
			<Nav />
		</header>
	)
}

export default Header