'use client';

import BreadCrumb from '@/components/breadcrumb';
import { Certificates } from '@/components/tables/certificates-tables/client';
import { Certificate } from '@/types/Certificate';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Events', link: '/dashboard/events' }];

async function getCertificates(
  session: Session | null
): Promise<Certificate[]> {
  const url = new URL(
    '/api/Certificado/List',
    process.env.NEXT_PUBLIC_BASE_URL_API
  );

  if (session?.user.id && session.user.role !== 'Admin') {
    url.searchParams.append('AlunoId', session.user.id);
  }
  // Buscar dados de uma API externa
  const res = await fetch(url, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    // Isso ativa o tratamento de erro mais próximo, como `error.js` Error Boundary
    throw new Error('Falha ao buscar os dados');
  }

  return res.json();
}

export default function Page() {
  const [data, setData] = useState<Certificate[]>([]);

  const getData = async () => {
    const session = await getSession();
    const data = await getCertificates(session);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Certificates data={data} />
      </div>
    </>
  );
}
