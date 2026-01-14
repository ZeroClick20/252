import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { WalletSidebar } from './components/WalletSidebar';
import { Ticker } from './components/Ticker';
import { Background } from './components/Background';
import { Menu, X, Globe, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-hidden">
      <Background />
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider font-mono">NEX<span className="text-primary">PROTOCOL</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-primary transition-colors">Governance</a>
          <a href="#" className="hover:text-primary transition-colors">Tokenomics</a>
          <a href="#" className="hover:text-primary transition-colors">Bridge</a>
          <a href="#" className="hover:text-primary transition-colors">Docs</a>
        </div>

        <button 
          onClick={toggleSidebar}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 group neon-border"
        >
          <span className="group-hover:text-primary transition-colors">Connect Wallet</span>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col">
        <Hero onConnect={toggleSidebar} />
      </main>

      {/* Ticker Section */}
      <div className="relative z-20 bg-black/50 backdrop-blur-sm border-y border-white/5 py-3">
        <Ticker />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center text-gray-500 text-xs">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-4 h-4" />
          <span>Secure AES-256 Encryption</span>
        </div>
        <p>© 2024 NEX Protocol Foundation. All rights reserved.</p>
      </footer>

      {/* Wallet Sidebar Overlay */}
      <WalletSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default App;