'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Certificate } from '@/types/Certificate';
import { Checkbox } from '@radix-ui/react-checkbox';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Certificate>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'nomeEvento',
    header: 'EVENTO'
  },
  {
    accessorKey: 'nomePalestrante',
    header: 'PALESTRANTE'
  },
  {
    accessorKey: 'quantidadeHoras',
    header: 'HORAS'
  },
  {
    accessorKey: 'alunoId',
    header: 'ID DO ALUNO'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
