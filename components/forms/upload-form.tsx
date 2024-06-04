'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FileUpload from '../file-upload';
import { useToast } from '../ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string(),
  date: z.date(),
  local: z.string(),
  additionalHours: z.string(),
  speakerRegistration: z.string(),
  organizerRegistration: z.string(),
  file: z.any()
});

type FileFormValues = z.infer<typeof formSchema>;

interface UploadFormProps {}

export const postEventParticipants = async (data: FileFormValues) => {
  const formData = new FormData();

  formData.append('Titulo', data.title);
  formData.append('Data', format(data.date, 'MM/dd/yyyy'));
  formData.append('Local', data.local);
  formData.append('HorasComplementares', data.additionalHours);
  formData.append('MatriculaPalestrante', data.speakerRegistration);
  formData.append('MatriculaOrganizador', data.organizerRegistration);
  formData.append('file', data.file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/Evento/SalvaPresencaEvento`,
    {
      method: 'POST',
      cache: 'no-cache',
      body: formData
    }
  );

  if (!response.ok) {
    throw new Error('An error occurred while creating the user');
  }

  return response;
};

export const UploadForm: React.FC<UploadFormProps> = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = 'Create';

  const form = useForm<FileFormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FileFormValues) => {
    try {
      setLoading(true);
      const response = await postEventParticipants(data);

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Event saved successfully'
        });
        router.refresh();
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Event name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="mt-auto flex flex-col">
                  <FormLabel>Date of event</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional hours</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speakerRegistration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaker registration</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizerRegistration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer registration</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value || []}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
