'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CsvData } from '@/constants/data';

export const columns: ColumnDef<CsvData>[] = [
  {
    accessorKey: 'matricula',
    header: 'MATRICULA'
  }
];
