import {useEffect, useContext} from 'react'
import {Navigate} from 'react-router-dom'

import	UserContext from '../UserContext'




export default function Logout(){

	const {unsetUser, setUser} = useContext(UserContext);

	// clear the localStorage of the user's information
	unsetUser();


	useEffect(() => {
		setUser({
			// set the user state back to its original value
			id : null
		})

	}, [])


	/*localStorage.clear();*/

	return(
			<Navigate to='/login'/>
		)


}