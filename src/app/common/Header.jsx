import React from 'react';
import { Link } from 'react-router';

let links = [
    { key: 1, name: 'Home', url: '/' },
    { key: 2, name: 'Coursers', url: '/courses' },
    { key: 3, name: 'About', url: '/about' }
];

const Header = () => {
    return (
        <div className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    {buildLinks()}
                </ul>
            </div>
        </div>
    );
};

export default Header;

/////

function buildLinks() {
    let currentPage = window.location.pathname;

    let linksList = [];
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let cname = link.url === currentPage ? 'active' : '';
        linksList.push(<li key={i} className={cname}><Link to={link.url}>{link.name}</Link></li>);
    }
    return linksList;
}