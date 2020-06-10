import React from 'react';
const UserContext = React.createContext();

export const UserProvider = () => {
	return <UserContext.Provider></UserContext.Provider>;
};
