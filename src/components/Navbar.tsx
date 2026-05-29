
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Search, Menu, X, Wallet } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useTranslation } from "@/utils/i18n";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { connectWallet, isConnected, address } = useWalletConnection();
  const { t } = useTranslation();
  
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    
    if (query.length === 66 && query.startsWith('0x')) {
      navigate(`/tx/${query}`);
    } else {
      navigate(`/address/${query}`);
    }
  };

  const handleWalletConnect = () => {
    connectWallet();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-afri-dark/80 backdrop-blur-lg border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-300 bg-clip-text text-transparent">ChainAfric</span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('home')}
              </Link>
              <Link to="/explore" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('explore')}
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('dashboard')}
              </Link>
            </div>
          </div>

          {/* Right side - Search and Connect */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="pl-10 pr-4 py-2 w-64 rounded-lg text-sm bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            <ThemeToggle />
            <LanguageSelector />
            
            <Button variant="outline" className="flex items-center gap-2" onClick={handleWalletConnect}>
              <Wallet className="h-4 w-4" />
              <span>{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : t('connect')}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-afri-dark border-t border-muted"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              {t('home')}
            </Link>
            <Link to="/explore" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              {t('explore')}
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              {t('dashboard')}
            </Link>
          </div>
          
          <div className="px-4 py-3 border-t border-muted">
            <form onSubmit={handleSearch} className="flex items-center mb-3 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="pl-10 pr-4 py-2 w-full rounded-lg text-sm bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            </form>
            
            <div className="flex items-center justify-between">
              <LanguageSelector />
              
              <Button variant="outline" className="flex items-center gap-2" size="sm" onClick={handleWalletConnect}>
                <Wallet className="h-4 w-4" />
                <span>{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : t('connect')}</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
