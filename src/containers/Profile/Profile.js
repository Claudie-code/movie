import { Card } from '@material-ui/core'
import React from 'react'
import Title from "../../components/Title";
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
    const { currentUser } = useAuth();
    console.log(currentUser)
    return (
        <>
            <Card>
                <Title>Profil de {currentUser.displayName}</Title>
            </Card>
        </>
    )
}
