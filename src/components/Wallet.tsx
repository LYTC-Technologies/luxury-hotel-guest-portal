/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Guest } from '../types';
import { walletTransactions } from '../data';
import ServiceHeader from './ServiceHeader';

interface WalletProps {
  guest: Guest;
  onBack: () => void;
}

export default function Wallet({ guest, onBack }: WalletProps) {
  const balance = guest.paidAmount - guest.balanceDue;

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="المحفظة الرقمية" subtitle="إدارة مدفوعاتك" onBack={onBack} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="glass-panel-gold rounded-2xl text-center space-y-3">
        <WalletIcon className="w-10 h-10 text-[#dfba73] mx-auto" />
        <div>
          <div className="text-3xl font-bold text-white font-mono">{balance.toLocaleString('ar-SA')} ر.س</div>
          <div className="text-xs text-gray-400 mt-1">الرصيد المتاح</div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
          <div>
            <div className="text-sm font-bold text-emerald-400 font-mono">{guest.paidAmount.toLocaleString('ar-SA')}</div>
            <div className="text-[10px] text-gray-500">إجمالي المدفوع</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#dfba73] font-mono">{guest.balanceDue.toLocaleString('ar-SA')}</div>
            <div className="text-[10px] text-gray-500">المستحق</div>
          </div>
        </div>
      </motion.div>

      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white">سجل المعاملات</h3>
        <div className="table-responsive">
          <div className="space-y-2 min-w-[260px]">
            {walletTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center bg-black/20 rounded-xl p-4 border border-white/5">
                <div className={`flex items-center gap-1 font-mono text-sm ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  {tx.type === 'credit' ? '+' : ''}{tx.amount.toLocaleString('ar-SA')} ر.س
                </div>
                <div className="text-right">
                  <div className="text-xs text-white">{tx.title}</div>
                  <div className="text-[10px] text-gray-500 font-mono">{tx.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
