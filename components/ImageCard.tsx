'use client';

import { useState, useRef, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import Spinner from './Spinner';
import ImageSelectorIcon from '@/assets/icons/ImageSelector.icon';
import { ColumnCardData, ColumnType } from '@/types/ui';
import { useY } from 'react-yjs';
import { yGetCardsForColumn } from '@/libs/yjsInstance';

interface ImageCardProps {
  card: ColumnCardData;
  column: ColumnType;
}

function ImageCard({ card, column }: ImageCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const cards = yGetCardsForColumn(column).toArray();

  const cardIndex = cards.findIndex((c) => c.get('id') === card.id);

  const xContent = cards[cardIndex].get('content');

  const displayContent = useY(cards[cardIndex].get('content'));

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
      xContent.delete(0, displayContent.length);
      xContent.insert(0, newBlob.url);
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
      {displayContent.length > 0 ? (
        <div className="relative w-full h-full">
          <Image src={displayContent.toString()} alt="Uploaded" layout="fill" objectFit="contain" />
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

export default memo(ImageCard);
