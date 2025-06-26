import React, { createContext, useState } from 'react';

// export const UserContext = createContext(null);
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // function to Update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // function to Clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;