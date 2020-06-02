import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='/'>
          <i className='fas fa-code' /> MoviesHub
        </a>
      </h1>
      <ul>
        <li>
          <a href='/add-movie'>Add Movies</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
