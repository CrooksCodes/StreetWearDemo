'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ProductImage } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * TeaserGallery — 3 teaser images with blur+desaturate filter.
 *
 * When `revealed` is true, the blur clears with a staggered animation.
 * The visual effect teases the upcoming drop without showing details.
 */
export function TeaserGallery({
  images,
  revealed,
}: {
  images: ProductImage[];
  revealed: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {images.map((image, i) => (
        <motion.div
          key={image.alt}
          className="relative aspect-[3/4] overflow-hidden bg-ink-50"
          initial={false}
          animate={{
            filter: revealed
              ? 'blur(0px) saturate(1)'
              : 'blur(20px) saturate(0.3)',
          }}
          transition={{
            duration: 0.8,
            delay: revealed ? i * 0.15 : 0,
            ease: 'easeOut',
          }}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 30vw, 33vw"
            className={cn('object-cover')}
          />
        </motion.div>
      ))}
    </div>
  );
}
