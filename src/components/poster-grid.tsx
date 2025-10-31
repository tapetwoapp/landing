"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Poster {
  id: number;
  url: string;
  delay: number;
}

export default function PosterGrid() {
  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    const cols = 20;
    const rows = 9;

    const totalPosters = cols * rows;
    const posterArray: Poster[] = Array.from(
      { length: totalPosters },
      (_, i) => ({
        id: i + 1,
        url: `/posters/poster-${(i % 99) + 1}.webp`,
        delay: Math.random() * 0.5,
      })
    );

    const shuffled = posterArray.sort(() => Math.random() - 0.5);
    setPosters(shuffled);
  }, []);

  const posterWidth = 120;
  const posterHeight = 180;
  const gap = 16;
  const cols = 20;
  const rows = 9;

  const centerCol = Math.floor(cols / 2);
  const centerRow = Math.floor(rows / 2);

  const centerStartCol = centerCol - 3;
  const centerEndCol = centerCol + 2;
  const centerStartRow = centerRow - 1;
  const centerEndRow = centerRow + 1;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 will-change-transform"
        initial={{ rotate: 0 }}
        animate={{ rotate: -15 }}
        transition={{
          duration: 0.8,
          ease: "easeIn",
        }}
      >
        {posters.slice(0, cols * rows).map((poster, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;

          const isInCenter =
            row >= centerStartRow &&
            row <= centerEndRow &&
            col >= centerStartCol &&
            col <= centerEndCol;

          if (isInCenter) return null;

          // const offsetX = row % 2 === 1 ? (posterWidth + gap) / 2 : 0;
          const offsetX = row % 2 === 0 ? (posterWidth + gap) / 2 : 0;

          const gridWidth = cols * (posterWidth + gap);
          const gridHeight = rows * (posterHeight + gap);

          const left = col * (posterWidth + gap) + offsetX - gridWidth / 2;
          const top = row * (posterHeight + gap) - gridHeight / 2;

          return (
            <motion.div
              key={`${poster.id}-${index}`}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: poster.delay,
                ease: "easeOut",
              }}
              className="absolute rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${posterWidth}px`,
                height: `${posterHeight}px`,
              }}
            >
              <Image
                src={poster.url}
                alt="Movie poster"
                width={posterWidth}
                height={posterHeight}
                className="w-full h-full object-cover"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              <div className="absolute inset-0 shadow-2xl pointer-events-none" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
