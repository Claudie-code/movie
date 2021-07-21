import { Card } from '@material-ui/core'
import React from 'react'
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
    const { currentUser, logout } = useAuth();
    return (
        <>
            <Card>
                <Title>Profil de {currentUser.email}</Title>
            </Card>
        </>
    )
}
