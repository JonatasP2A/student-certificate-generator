import { DashboardNav } from '@/components/dashboard-nav';
import { adminNavItems, userNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const { data } = useSession();
  const navItems = data?.user.role === 'Admin' ? adminNavItems : userNavItems;

  return (
    <nav
      className={cn(`relative hidden h-screen w-72 border-r pt-16 lg:block`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Visão Geral
            </h2>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
