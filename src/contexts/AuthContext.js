import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db, firestore } from '../firebase';

const AuthContext = React.createContext();

const userCollection = db.collection('users').doc(auth.currentUser?.uid);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState();

    function createDisplayName(newName) {
        return auth.currentUser.updateProfile({displayName: newName})
    };

    function createUserCollection() {
        return userCollection.set({favorites:[]});
    };

    async function getFavorites() {
        const docRef = await userCollection.get();

        if (docRef.exists) {
            if (docRef.data().favorites) setFavorites(docRef.data().favorites);
        } else {
            console.log("Cette collection n'existe pas");
        }
    };

    function addFavoritesUserCollection(movieId) {
        return userCollection.update({
            favorites: firestore.FieldValue.arrayUnion(movieId)
        });
    };

    function removeFavoritesUserCollection(movieId) {
        return userCollection.update({
            favorites: firestore.FieldValue.arrayRemove(movieId)
        });
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
        userCollection.onSnapshot(querySnapshot => setFavorites(querySnapshot.data()?.favorites))

        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }); 

        return unsubscribe;
    }, []);

    const value = {
        favorites,
        currentUser,
        getFavorites,
        addFavoritesUserCollection,
        removeFavoritesUserCollection,
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

