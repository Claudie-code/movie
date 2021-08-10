import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function createDisplayName(newName) {
        return auth.currentUser.updateProfile({displayName: newName})
    };

    function createUserCollection() {
        return db.collection('users').doc(auth.currentUser.uid).set({favorites:[]});
    };

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    };

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    };

    function logout() {
        return auth.signOut();
    }
    
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }); 
        
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        createUserCollection,
        createDisplayName,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

