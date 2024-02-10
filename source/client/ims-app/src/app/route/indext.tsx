// AppRoutes.tsx
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { Dashboard } from '../dashboard';
import { RoutingConstraints } from './constraints';
import CombineModule from '../login/index';
import InfluencerForm from '../Influencer-form/form';
import InfluencerList from '../influencer-list/list';

const AppRoutes: React.FC = () => {
  // Assuming your authentication logic is correct
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Navigate to={RoutingConstraints.MODULE} />} />

      <Route
          path={RoutingConstraints.MODULE}
          element={
            isAuthenticated ? <Navigate to="/home/dashboard" /> : <CombineModule />
          }
        />
        <Route
          path="/home"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="influencerform" element={<InfluencerForm />} />
          <Route path="influencerlist" element={<InfluencerList />}/>
          {/* <Route path='edit/influencerlist'  element={<InfluencerForm  />} /> */}
          <Route path="*" element={<p>404 Not Found</p>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
