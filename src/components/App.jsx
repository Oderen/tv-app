import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';

const HomePage = lazy(() => import('../pages/HomePage'));
const ShowDetails = lazy(() => import('../pages/ShowDetails'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/:showID" element={<ShowDetails />} />
      </Route>
    </Routes>
  );
};
