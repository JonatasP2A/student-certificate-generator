'use client';

import { useSession } from 'next-auth/react';
import { UserSummary } from './user-summary';
import { AdminSummary } from './admin-summary';
import { Certificate } from '@/types/Certificate';

type DashboardSummaryProps = {
  data: Certificate[];
};

export function DashboardSummary({ data }: DashboardSummaryProps) {
  const { data: session } = useSession();

  if (session?.user.role === 'Admin') return <AdminSummary data={data} />;

  return <UserSummary data={data} />;
}
