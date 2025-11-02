"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Poster {
  id: number;
  url: string;
  delay: number;
}

interface PosterGridProps {
  className?: string;
  staggerAxis?: "row" | "column" | "none";
  reverseStagger?: boolean;
  reverseOffsets?: boolean;
  mirror?: boolean;
  rotate?: number;
  cols?: number;
  rows?: number;
  posterWidth?: number;
  posterHeight?: number;
  gap?: number;
  centerColOffsetStart?: number;
  centerColOffsetEnd?: number;
  centerRowOffsetStart?: number;
  centerRowOffsetEnd?: number;
}

export default function PosterGrid({
  className,
  staggerAxis = "row",
  reverseStagger,
  reverseOffsets = false,
  mirror = false,
  rotate,
  cols: colsProp = 20,
  rows: rowsProp = 9,
  posterWidth: posterWidthProp = 120,
  posterHeight: posterHeightProp = 180,
  gap: gapProp = 16,
  centerColOffsetStart = -3,
  centerColOffsetEnd = 2,
  centerRowOffsetStart = -1,
  centerRowOffsetEnd = 1,
}: PosterGridProps = {}) {
  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    const totalPosters = colsProp * rowsProp;
    const posterArray: Poster[] = Array.from(
      { length: totalPosters },
      (_, i) => ({
        id: i + 1,
        url: `/posters/poster-${(i % 99) + 1}.webp`,
        delay: Math.random() * 0.5,
      }),
    );

    const shuffled = posterArray.sort(() => Math.random() - 0.5);
    setPosters(shuffled);
  }, [colsProp, rowsProp]);

  const posterWidth = posterWidthProp;
  const posterHeight = posterHeightProp;
  const gap = gapProp;
  const cols = colsProp;
  const rows = rowsProp;

  const centerCol = Math.floor(cols / 2);
  const centerRow = Math.floor(rows / 2);

  const centerStartCol = centerCol + centerColOffsetStart;
  const centerEndCol = centerCol + centerColOffsetEnd;
  const centerStartRow = centerRow + centerRowOffsetStart;
  const centerEndRow = centerRow + centerRowOffsetEnd;

  const rotationAngle = useMemo(() => {
    if (typeof rotate === "number") return rotate;
    return mirror ? 15 : -15;
  }, [mirror, rotate]);

  const effectiveReverse =
    typeof reverseStagger === "boolean" ? reverseStagger : reverseOffsets;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute left-1/2 top-1/2 will-change-transform"
        initial={{ rotate: 0 }}
        animate={{ rotate: rotationAngle }}
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

          const gridWidth = cols * (posterWidth + gap);
          const gridHeight = rows * (posterHeight + gap);

          let left = col * (posterWidth + gap) - gridWidth / 2;
          let top = row * (posterHeight + gap) - gridHeight / 2;

          if (staggerAxis === "row") {
            const shouldShift =
              (row % 2 === 0 && !effectiveReverse) ||
              (row % 2 === 1 && effectiveReverse);
            if (shouldShift) {
              left += (posterWidth + gap) / 2;
            }
          } else if (staggerAxis === "column") {
            const shouldShift =
              (col % 2 === 0 && !effectiveReverse) ||
              (col % 2 === 1 && effectiveReverse);
            if (shouldShift) {
              top += (posterHeight + gap) / 2;
            }
          }

          if (mirror) {
            left = -left - posterWidth;
          }

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
              className="group absolute cursor-pointer overflow-hidden rounded-2xl"
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
                className="h-full w-full object-cover"
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              <div className="pointer-events-none absolute inset-0 shadow-2xl" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function InvertedPosterGrid({
  rotate,
  ...props
}: Omit<PosterGridProps, "reverseOffsets" | "mirror" | "rotate"> & {
  rotate?: number;
} = {}) {
  return (
    <PosterGrid
      {...props}
      staggerAxis="row"
      reverseStagger
      mirror
      rotate={typeof rotate === "number" ? rotate : 15}
    />
  );
}

export function VerticalPosterGrid({
  rotate,
  reverseStagger,
  ...props
}: Omit<
  PosterGridProps,
  "staggerAxis" | "reverseOffsets" | "mirror" | "rotate"
> & { rotate?: number } = {}) {
  return (
    <PosterGrid
      {...props}
      staggerAxis="column"
      reverseStagger={reverseStagger}
      rotate={typeof rotate === "number" ? rotate : 0}
      mirror={false}
    />
  );
}
