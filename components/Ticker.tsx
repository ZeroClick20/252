import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const FAKE_CLAIMS = [
  { addr: '0x71...3A92', amount: '450 NEX' },
  { addr: '0xA4...9921', amount: '1,200 NEX' },
  { addr: '0x12...BC42', amount: '350 NEX' },
  { addr: '0x99...F211', amount: '8,500 NEX' },
  { addr: '0x33...11AA', amount: '220 NEX' },
  { addr: '0xBB...8812', amount: '2,150 NEX' },
  { addr: '0xFE...7123', amount: '500 NEX' },
  { addr: '0xCC...DD44', amount: '675 NEX' },
];

export const Ticker: React.FC = () => {
  return (
    <div className="ticker-wrap flex items-center">
      <div className="ticker-move flex gap-12">
        {[...FAKE_CLAIMS, ...FAKE_CLAIMS].map((claim, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="font-mono text-gray-300">{claim.addr}</span>
            <span className="text-xs text-gray-600">claimed</span>
            <span className="font-bold text-primary">{claim.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};