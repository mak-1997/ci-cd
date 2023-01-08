import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import RepoPage from './RepoPage';

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route to="/repo" element={<RepoPage />} />
            <Route to="/" element={<Homepage />} />
        </Routes>
    </div>
  )
}

export default AllRoutes