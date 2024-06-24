'use client';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/Certificate';
import { Download } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface CellActionProps {
  data: Certificate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const path = usePathname();

  const handleDownload = async () => {
    const currentPageUrl = window.location.href + path;
    await fetch(
      `/api/screenshot?url=${currentPageUrl}?aluno=${data.aluno}&palestra=${data.nomeEvento}`
    );
  };

  return (
    <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleDownload}>
      <Download className="h-4 w-4" />
    </Button>
  );
};
