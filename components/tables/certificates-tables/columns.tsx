'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Certificate } from '@/types/Certificate';

export const columns: ColumnDef<Certificate>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'nomeEvento',
    header: 'EVENT'
  },
  {
    accessorKey: 'nomePalestrante',
    header: 'SPEAKER'
  },
  {
    accessorKey: 'quantidadeHoras',
    header: 'HOURS'
  },
  {
    accessorKey: 'alunoId',
    header: 'STUDENT ID'
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
