import { useState } from 'react';

export default function useUser(){
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const userT = JSON.stringify(userString);
        return userT?.user
    };
  
    const [user, setUser] = useState(getUser());

    const saveUser = userT => {
        localStorage.setItem('user', JSON.stringify(userT));
        setUser(userT.user)
    };
    console.log(user);
    return{
        setUser: saveUser,
        user
    }
}