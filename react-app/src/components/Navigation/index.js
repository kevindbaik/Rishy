import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import CreatePostForm from "../Post/PostForm/CreatePost";
import logo from '../../images/rishy.-logo.svg'

function Navigation({ isLoaded }){
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	const handleProfileClick = e => {
		e.preventDefault();
		history.push(`/users/${sessionUser.id}/posts`)
	};

	return (
		<ul id='nav-container'>
			<li>
				<h3 id='nav-search'>SEARCH BAR</h3>
			</li>
			<li>
				<NavLink id='nav-logo' exact to="/posts">
					<img className='logo-rishy' src={logo}></img>
				</NavLink>
			</li>
			{isLoaded && (
				<div id='nav-topright'>
					<li>
						<OpenModalButton modalComponent={<CreatePostForm />} buttonText={"+"}/>
					</li>
					<li>
						<i onClick={handleProfileClick} class="fa-regular fa-user"></i>
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
