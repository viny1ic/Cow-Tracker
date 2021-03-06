import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-codes';
import firebase from 'firebase';
const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState('');
	const signin = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account',
		});
		auth.signInWithPopup(provider);
	};
	const signOut = () => {
		auth.signOut();
	};
	useEffect(() => {
		const uns = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
		return uns;
	}, []);

	const value = {
		currentUser,
		signin,
		signOut,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
