import React from 'react';
import './Header.css';

function Header() {

    return(
        <div className='headerContainer'>
            <h1 className='headerLogo'>Flavr</h1>
            <ul className='headerLinkList'>
                <li><a href='/home'>Home</a></li>
                <li><a href='#'>Profile</a></li>
                <li><a href='#'>Favorites</a></li>
                <li><a href='/new'>Add</a></li>
            </ul>
        </div>
    );
};

export default Header;