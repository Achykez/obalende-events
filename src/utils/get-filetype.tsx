export const getFileTypeFromUrl = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase();
  
    if (!extension) {
      return 'unknown';
    }
  
    const mimeTypes: { [key: string]: string } = {
      jpg: '.jpg',
      jpeg: '.jpg',
      png: '.png',
      pdf: '.pdf',


    };
  
    return mimeTypes[extension] || 'unknown';
  };
  
  export const fileSizeInMegabytes = (fileSize?: number) => {
    const sizeInMegabytes = ((fileSize ?? 0) / 1000000).toFixed(2);
    return sizeInMegabytes;
  };