import { useState } from 'react';
import { FloatingCardBackground } from '../components/3d/FloatingCardBackground';
import { BalanceHeader } from '../components/dashboard/BalanceHeader';
import { CardCarousel } from '../components/cards/CardCarousel';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { AddCardModal } from '../components/cards/AddCardModal';

export function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col gap-6">
      <FloatingCardBackground />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Balance + Card Carousel + Quick Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass rounded-3xl p-2 md:p-4">
            <BalanceHeader />
            <CardCarousel />
          </div>
          
          <QuickActions onAddCard={() => setShowAddModal(true)} />
        </div>

        {/* Right Column: Recent Transactions */}
        <div className="lg:col-span-5">
          <div className="glass rounded-3xl p-2 md:p-4 shadow-xl">
            <RecentTransactions />
          </div>
        </div>
      </div>

      <AddCardModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
