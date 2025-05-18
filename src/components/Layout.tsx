
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className="flex-grow pt-24" // Added padding-top (pt-24) here to create more space below navbar
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
