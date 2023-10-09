import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, password, email, firstName, lastName));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors({
				confirm: "confirm password field must be the same as the password field",
			});
		}
	};

	return (
		<div id='signup-container'>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div id='signup-email-container'>
					<label>
						Email:
					</label>
					{errors && errors.email &&
					<p id='error-text'>{errors.email}</p>
					}
					<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
				</div>
				<div id='signup-firstname-container'>
					<label>
						First Name:
					</label>
					<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
				</div>
				<div id='signup-lastname-container'>
					<label>
						Last Name:
					</label>
					<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
				</div>
				<div id='signup-username-container'>
					<label>
						Username:
					</label>
					{errors && errors.username &&
					<p id='error-text'>{errors.username}</p>
					}
					<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
				</div>
				<div id='signup-password-container'>
					<label>
						Password:
					</label>
					{errors && errors.password &&
					<p id='error-text'>{errors.password}</p>
					}
					<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
				</div>
				<div id='signup-confirm-container'>
					<label>
						Confirm Password:
					</label>
					{errors && errors.confirm &&
					<p id='error-text'>{errors.confirm}</p>
					}
					<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<button id='signup-submit-button' type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
