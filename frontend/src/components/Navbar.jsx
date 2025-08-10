import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <div className="flex items-center">
            <span className="text-red-600 text-2xl font-bold tracking-wider">NETFLIX</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="lg:hidden text-white hover:bg-white/10"
          >
            Browse <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-black/50 border border-white/20 rounded-sm">
                <Search className="h-4 w-4 text-white ml-3" />
                <Input
                  placeholder="Titles, people, genres"
                  className="bg-transparent border-none text-white placeholder-gray-400 w-60 focus:ring-0"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Kids Link */}
          <a href="#" className="hidden md:block text-white hover:text-gray-300 transition-colors text-sm">
            Kids
          </a>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <ChevronDown className="h-4 w-4 text-white group-hover:rotate-180 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;