import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BuyerDashboard from './pages/Dashboard/BuyerDashboard';
import SellerDashboard from './pages/Dashboard/SellerDashboard';
import AuthGuard from './components/auth/AuthGuard';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import AddProperty from './pages/Property/AddProperty';

function App() {
  console.log('App component rendering');
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="w-full min-h-screen bg-gray-50">
            <Layout>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/buyer"
                  element={
                    <ProtectedRoute roles={['buyer']}>
                      <BuyerDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/dashboard/seller"
                  element={
                    <ProtectedRoute roles={['seller']}>
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/properties/add"
                  element={
                    <ProtectedRoute roles={['seller']}>
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
