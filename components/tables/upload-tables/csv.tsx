'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CsvData } from '@/constants/data';
import { columns } from './columns';

interface CsvUploadDataProps {
  data: CsvData[];
}

export const CsvUploadData: React.FC<CsvUploadDataProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable searchKey="matricula" columns={columns} data={data} />
    </>
  );
};
