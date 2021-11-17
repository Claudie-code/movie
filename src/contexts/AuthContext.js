import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db, firestore } from '../firebase';

const AuthContext = React.createContext();

const userCollection = db.collection('users');

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState();

    function updateDisplayName(newName) {
        return auth.currentUser.updateProfile({displayName: newName})
    };

    function createUserCollection() {
        return userCollection.doc(auth.currentUser.uid).set({favorites:[]});
    };

    async function getFavorites() {
        let docRef;
        if(auth.currentUser.uid) {
            docRef = await userCollection.doc(auth.currentUser.uid).get();
        }

        if (docRef.exists) {
            if (docRef.data().favorites) setFavorites(docRef.data().favorites);
        } else {
            console.log("Cette collection n'existe pas");
        }
    };

    function addFavoritesUserCollection(movieId) {
        return userCollection.doc(auth.currentUser.uid).update({
            favorites: firestore.FieldValue.arrayUnion(movieId)
        });
    };

    function removeFavoritesUserCollection(movieId) {
        return userCollection.doc(auth.currentUser.uid).update({
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

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            userCollection.doc(auth.currentUser.uid).onSnapshot(querySnapshot => setFavorites(querySnapshot.data()?.favorites));
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
        updateDisplayName,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

