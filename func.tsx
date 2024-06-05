import React, { useState, useEffect } from 'react';

interface UserDataProps {
  userId: string;
}

interface User {
  name: string;
  email: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchUserData = () => {
      fetch(`https://secret.url/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user data:', error));
    };

    fetchUserData();
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  useEffect(() => {
    const fetchUserData = () => {
      fetch(`https://secret.url/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user data:', error));
    };

    if (user) {
      console.log(`User data loaded for ${user.name}`);
    }
  }, [user]);

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
