/* eslint-disable no-console */
'use client';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/types/Certificate';
import { Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
  data: Certificate;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDownload = async () => {
    try {
      const certificatePageUrl = new URL(
        '/certificate',
        window.location.origin
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

      router.push(certificatePageUrl.toString());
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
