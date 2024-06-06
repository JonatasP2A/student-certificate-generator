'use client';

import { useSession } from 'next-auth/react';
import { UserSummary } from './user-summary';
import { AdminSummary } from './admin-summary';

export function DashboardSummary() {
  const { data } = useSession();

  if (data?.user.role === 'Admin') return <AdminSummary />;

  return <UserSummary />;
}
