'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Certificate } from '@/types/Certificate';
import { columns } from './columns';
import { useSession } from 'next-auth/react';

interface CertificatesProps {
  data: Certificate[];
}

export function Certificates({ data }: CertificatesProps) {
  const { data: session } = useSession();

  const dataTable =
    session?.user.role === 'User'
      ? data.filter((d) => d.alunoId === session?.user.id)
      : data;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Events (${dataTable.length})`}
          description="Lectures you have already attended"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={dataTable} />
    </>
  );
}
