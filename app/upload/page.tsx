import BreadCrumb from '@/components/breadcrumb';
import { UploadForm } from '@/components/forms/upload-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

const breadcrumbItems = [{ title: 'Upload', link: '/upload' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Upload`}
            description="Envie arquivos com a presença de estudantes no seu evento"
          />
        </div>
        <Separator />

        <UploadForm />
      </div>
    </>
  );
}
