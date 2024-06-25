'use client';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/Certificate';
import { Download } from 'lucide-react';

interface CellActionProps {
  data: Certificate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const handleDownload = async () => {
    const certificatePageUrl = new URL('/certificate', window.location.origin);

    if (data.aluno)
      certificatePageUrl.searchParams.set(
        'aluno',
        encodeURIComponent(data.aluno)
      );

    if (data.nomeEvento)
      certificatePageUrl.searchParams.set(
        'palestra',
        encodeURIComponent(data.nomeEvento)
      );

    // if (data.matricula)
    //   certificatePageUrl.searchParams.set(
    //     'matricula',
    //     encodeURIComponent(data.matricula)
    //   );

    const response = await fetch(
      `/api/screenshot?url=${certificatePageUrl.toString()}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `certificado-${data.nomeEvento}.jpg`; // Specify the image file name and extension
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleDownload}>
      <Download className="h-4 w-4" />
    </Button>
  );
};
