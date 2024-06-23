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
  //       aria-label="Selecionar tudo"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Selecionar linha"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
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
    accessorKey: 'matricula',
    header: 'MATRICULA'
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
