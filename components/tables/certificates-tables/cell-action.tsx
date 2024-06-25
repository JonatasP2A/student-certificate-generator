/* eslint-disable no-console */
'use client';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/Certificate';
import { Download } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface CellActionProps {
  data: Certificate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: session } = useSession();

  const handleDownload = async () => {
    try {
      const certificatePageUrl = new URL(
        '/certificate',
        window.location.origin
      );

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

      if (session?.user.matricula)
        certificatePageUrl.searchParams.set(
          'matricula',
          encodeURIComponent(session.user.matricula)
        );

      const response = await fetch(
        `/api/screenshot?url=${certificatePageUrl.toString()}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `certificado.png`; // Specify the image file name and extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(
        'Ocorreu um erro ao baixar o certificado. Por favor, tente novamente.'
      );
    }
  };

  return (
    <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleDownload}>
      <Download className="h-4 w-4" />
    </Button>
  );
};
