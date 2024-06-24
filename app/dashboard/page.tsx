import { DashboardSummary } from '@/components/layout/DashboardSummary/dashboard-summary';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Certificate } from '@/types/Certificate';
import { DownloadButton } from './DownloadButton';

async function getCertificates(): Promise<Certificate[]> {
  // Buscar dados de uma API externa
  const res = await fetch(
    'https://projeto-de-software.onrender.com/api/Certificado/List'
  );

  if (!res.ok) {
    // Isso ativa o tratamento de erro mais próximo, como `error.js` Error Boundary
    throw new Error('Falha ao buscar os dados');
  }

  return res.json();
}

export default async function page() {
  const data = await getCertificates();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Olá, bem-vindo de volta 👋
          </h2>
          <DownloadButton />
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
