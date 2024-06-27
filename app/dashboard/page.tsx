'use client';

import { DashboardSummary } from '@/components/layout/DashboardSummary/dashboard-summary';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Certificate } from '@/types/Certificate';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

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
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Olá, bem-vindo de volta 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <DashboardSummary data={data} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={data} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
