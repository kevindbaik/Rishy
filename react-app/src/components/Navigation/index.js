import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/rishy.-logo.svg'

function Navigation({ isLoaded }){
	// const location = useLocation();
	const sessionUser = useSelector(state => state.session.user);

	// let onHomePage = location.pathname === '/posts';
	return (
		<ul id='nav-container'>
			<li>
			<input type="search" id="nav-search" placeholder="coming soon..." />
			</li>
			<li className='nav-logo-container'>
				<NavLink id='nav-logo' exact to="/posts">
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
