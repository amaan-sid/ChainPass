import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Navbar = () => {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upcoming", path: "/upcoming" },
    { name: "Buy Tickets", path: "/buy" },
    { name: "My Tickets", path: "/mytickets" },
  ];

  // Check if wallet is connected on component mount
  useEffect(() => {
    if (window.ethereum) {
      checkWalletConnection();
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0].address);
        setProvider(provider);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      setIsConnected(true);
      setWalletAddress(accounts[0]);
      setProvider(provider);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // Wallet disconnected
      setIsConnected(false);
      setWalletAddress("");
      setProvider(null);
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    setProvider(null);
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Main Branding */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="text-3xl font-extrabold text-white tracking-tight">
           CHAIN PASS
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold text-xs">CP</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-2 py-1 rounded-md transition-all duration-300 transform hover:scale-105 ${
                location.pathname === item.path
                  ? "bg-white text-red-600 font-bold shadow-md px-3 py-1"
                  : "text-white hover:bg-red-500 hover:bg-opacity-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Wallet Connection Button */}
        <div className="mt-4 md:mt-0">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={disconnectWallet}
                className="bg-white text-red-600 font-bold px-3 py-1 rounded-md hover:bg-gray-100 transition duration-200 text-sm"
              >
                Disconnect
              </button>
              <span className="bg-white bg-opacity-20 border border-white px-3 py-1 rounded-md text-sm font-medium">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </span>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-white text-red-600 font-bold px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 shadow-md"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;