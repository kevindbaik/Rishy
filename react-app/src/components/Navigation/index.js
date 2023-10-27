import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useViewContext } from '../../context/HomeView';
import './Navigation.css';
import logo from '../../images/rishy.-logo.svg';

function Navigation({ isLoaded }){
	// const location = useLocation();
	const sessionUser = useSelector(state => state.session.user);
	const { setCurrentView } = useViewContext();

	const handleLogoClick = () => {
		setCurrentView('home');
	};
	// let onHomePage = location.pathname === '/posts';
	return (
		<ul id='nav-container'>
			<li>
			<input type="search" id="nav-search" placeholder="search..." />
			</li>
			<li className='nav-logo-container' onClick={handleLogoClick}>
				<NavLink id='nav-logo' exact to={sessionUser ? "/posts" : "/"}>
					<img className='logo-rishy' src={logo}></img>
				</NavLink>
			</li>
			{isLoaded && (
				<div id='nav-topright'>
					<li>
						<ProfileButton user={sessionUser}/>
					</li>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
