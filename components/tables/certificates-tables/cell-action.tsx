/* eslint-disable no-console */
'use client';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/Certificate';
import { Download, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface CellActionProps {
  data: Certificate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const certificatePageUrl = new URL(
        '/certificate',
        'https://student-certificate-generator.vercel.app/'
      );

      if (session?.user.name)
        certificatePageUrl.searchParams.set('aluno', session.user.name);

      if (data.nomeEvento)
        certificatePageUrl.searchParams.set('palestra', data.nomeEvento);

      if (session?.user.matricula)
        certificatePageUrl.searchParams.set(
          'matricula',
          session.user.matricula
        );

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({
          url: certificatePageUrl.toString()
        })
      });

      if (response.ok) {
        const url = await response.json();

        window.open(url.assetUrl, '_blank');
      }
    } catch (error) {
      console.error(error);
      alert(
        'Ocorreu um erro ao baixar o certificado. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleDownload}>
      {loading ? (
        <Loader className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
    </Button>
  );
};
