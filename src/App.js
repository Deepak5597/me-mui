import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { ConfigContextProvider } from './contexts/ConfigContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/utility/ProtectedRoute';
import Redirect from './components/utility/Redirect';
import Loading from './components/utility/Loading';
const NotFound = React.lazy(() => import('./components/error/NotFound'));
const UnAuthorized = React.lazy(() => import('./components/error/UnAuthorized'));
const Login = React.lazy(() => import('./components/onboarding/Login'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const PartyLayout = React.lazy(() => import('./components/parties/PartyLayout'));
const ItemLayout = React.lazy(() => import('./components/items/ItemLayout'));
const SaleLayout = React.lazy(() => import('./components/sales/SaleLayout'));

function App() {
  return (
    <BrowserRouter>
      <ConfigContextProvider>
        <GlobalContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route path="/login" element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
              <Route path="/unauthorise" element={<Suspense fallback={<Loading />}><UnAuthorized /></Suspense>} />

              <Route element={<Layout />}>

                {/* Protected Routes */}
                <Route element={<Suspense fallback={<Loading />}><ProtectedRoute allowedRoles={["admin", "sales"]} /></Suspense>}>
                  <Route path="/" exact element={<Redirect pathname="/dashboard" />} />
                  <Route path="/dashboard" exact element={<Dashboard />} />
                  <Route path="/parties" exact element={<PartyLayout />} />
                  <Route path="/items" exact element={<ItemLayout />} />
                  <Route path="/sales" exact element={<SaleLayout />} />
                </Route>
              </Route>

              <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
            </Routes>
          </AuthContextProvider>
        </GlobalContextProvider>
      </ConfigContextProvider>
    </BrowserRouter>
  );
}

export default App;
