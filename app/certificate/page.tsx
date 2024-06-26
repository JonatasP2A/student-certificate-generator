'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  const studentName = searchParams.get('aluno') || 'Nome do Aluno';
  const course = searchParams.get('palestra') || 'Nome da Palestra';
  const registration = searchParams.get('matricula') || '000000000';

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-[#FFFFFF]"
      id="certificate"
    >
      <div className="flex h-screen w-11/12 flex-col items-center justify-center py-20">
        <div>
          <Image
            src="/cert-header-logos.png"
            alt="Dasi logo e brasão da UFF"
            width={190}
            height={120}
          />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[#27272A]">
          CERTIFICADO DE ATIVIDADE COMPLEMENTAR
        </h1>

        <div className="mb-3 h-1 w-full bg-green" />

        <h2 className="mb-3 text-3xl font-medium text-[#27272A]">
          {studentName}
        </h2>

        <span className="text-xl text-[#27272A]">
          Certificamos que o aluno, inscrito no curso de Sistemas de Informação
          da Universidade Federal Fluminense sob a matrícula{' '}
          <strong>{registration}</strong>, participou da palestra{' '}
          <strong>&quot;{course}&quot;</strong> com carga horária de{' '}
          <strong>1</strong>h(s).
        </span>

        <div className="mt-auto flex w-full flex-col items-center">
          <div className="h-0.5 w-1/4 bg-black" />
          <span className="text-l font-medium text-[#27272A]">
            Daniele Pimenta
          </span>
          <span className="text-l text-[#27272A] text-[#27272A]">
            Diretora Geral - DASI
          </span>
        </div>
      </div>
    </div>
  );
}
