import React, { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to=":showID">Details</NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={'Loading...'}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
