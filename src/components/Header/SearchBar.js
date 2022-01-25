import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ handlePush }) {
    const [searchOpen, setSearchOpen] = useState(null);
    const searchId = 'search-menu';
    const isSearchOpen = Boolean(searchOpen);

    const handleSearchOpen = (event) => {
        setSearchOpen(event.currentTarget);
    };

    const handleSearchClose = () => {
        setSearchOpen(null);
    };

    const renderSearch = (
        <Menu
            anchorEl={searchOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={searchId}
            keepMounted
            style={{height: "400px"}}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isSearchOpen}
            onClose={handleSearchClose}
            >
            <MenuItem onClick={() => handlePush('/genres')}>Catégories</MenuItem>
            <AutocompleteSearch />
        </Menu>
    );

    return (
        <>
            <IconButton 
                aria-label="open search"
                onClick={handleSearchOpen}
                aria-controls={searchId}
                color="secondary"
            >
                <SearchIcon />
            </IconButton>
            {renderSearch}
        </>
    );
}

export default SearchBar;