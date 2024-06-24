'use client';

import { Button } from '@/components/ui/button';

export function DownloadButton() {
  async function takeScreenshot() {
    // window.open(`/api/screenshot?url=${window.location.href}`);
    const response = await fetch(`/api/screenshot?url=${window.location.href}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'image.jpg'; // Specify the image file name and extension
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return <Button onClick={takeScreenshot}>Download</Button>;
}
