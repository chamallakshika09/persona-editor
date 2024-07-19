'use client';

import ImageSelectorIcon from '@/assets/icons/ImageSelector.icon';
import Card from './Card';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import Spinner from './Spinner';

export default function ImageCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async () => {
    setError(null);

    if (!fileInputRef.current?.files) {
      setError('No file selected');
      return;
    }

    const file = fileInputRef.current.files[0];

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setLoading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/image/upload',
      });
      setBlob(newBlob);
    } catch (uploadError) {
      setError(`Failed to upload image: ${uploadError}`);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card height="h-[200px]">
      {blob ? (
        <div className="relative w-full h-full">
          <Image src={blob.url} alt="Uploaded" layout="fill" objectFit="contain" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-2">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <ImageSelectorIcon />
              <button onClick={handleButtonClick} className="text-[#222ADD] text-sm">
                Choose an image
              </button>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
            </>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </Card>
  );
}
