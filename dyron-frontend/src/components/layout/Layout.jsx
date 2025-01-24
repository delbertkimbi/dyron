import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 