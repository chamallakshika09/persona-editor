'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import Spinner from './Spinner';
import ImageSelectorIcon from '@/assets/icons/ImageSelector.icon';
import { CardData, ColumnType } from '@/types/ui';
import { usePersona } from '@/contexts/PersonaContext';

interface ImageCardProps {
  card: CardData;
  column: ColumnType;
}

function ImageCard({ card, column }: ImageCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setLeftColumnCards, setRightColumnCards } = usePersona();

  const updateCardContent = useCallback(
    (content: string) => {
      const id = card.id;
      if (column === 'left') {
        setLeftColumnCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, content } : card)));
      } else {
        setRightColumnCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, content } : card)));
      }
    },
    [card.id, column, setLeftColumnCards, setRightColumnCards]
  );

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
      updateCardContent(newBlob.url);
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
      {card.content ? (
        <div className="relative w-full h-full">
          <Image src={card.content} alt="Uploaded" layout="fill" objectFit="contain" />
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
