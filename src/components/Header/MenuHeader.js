import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

function MenuHeader({ handlePush, currentUser }) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState('');
    const { logout, handleModalOpen } = useAuth();
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'account-menu';

    async function handleLogout() {
        setError('');
        try {
          await logout();
          window.location.reload();
          history.push('/');
        } catch {
          setError('Failed to log out')
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (url) => {
        handlePush(url)
        handleMenuClose();
    };

    const handleMenuClickLogout = () => {
        handleLogout();
        handleMenuClose();
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClick("/account")}>My account</MenuItem>
            <MenuItem onClick={() => handleMenuClickLogout()}>Logout</MenuItem>
            {error && <Alert severity="error">{error}</Alert>}
        </Menu>
    );

    return (
        <>
            { currentUser ? 
                <>
                    <IconButton
                        edge="end"
                        aria-label="compte de l'utilisateur"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <Avatar
                            alt="avatar"
                            src={currentUser?.photoURL}
                        />
                    </IconButton> 
                </> :
                <div>
                    <Button onClick={handleModalOpen}>Login</Button>
                </div>
            }
            {renderMenu}
        </>

    );
}

export default MenuHeader;