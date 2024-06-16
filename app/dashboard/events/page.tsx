import BreadCrumb from '@/components/breadcrumb';
import { Certificates } from '@/components/tables/certificates-tables/client';
import { Certificate } from '@/types/Certificate';

const breadcrumbItems = [{ title: 'Events', link: '/dashboard/events' }];

export async function getCertificates(): Promise<Certificate[]> {
  // Fetch data from external API
  const res = await fetch(
    'https://projeto-de-software.onrender.com/api/Certificado/List'
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getCertificates();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Certificates data={data} />
      </div>
    </>
  );
}
