import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="w-full rounded-2xl border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900 p-4 flex flex-col space-y-4 animate-pulse">
      {/* Visual Frame Placeholder */}
      <div className="w-full aspect-square rounded-xl bg-neutral-200 dark:bg-neutral-800" />
      {/* Category line */}
      <div className="w-1/3 h-3 rounded bg-neutral-200 dark:bg-neutral-800" />
      {/* Title line */}
      <div className="w-2/3 h-5 rounded bg-neutral-200 dark:bg-neutral-800" />
      {/* Price and button line */}
      <div className="flex items-center justify-between pt-2">
        <div className="w-1/4 h-5 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="w-1/3 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export const SkeletonDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
      {/* Product Image Frame */}
      <div className="w-full aspect-square rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      {/* Details stack */}
      <div className="flex flex-col space-y-5 py-4">
        <div className="w-1/4 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="w-3/4 h-8 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex items-center space-x-2">
          <div className="w-24 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-16 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="w-1/3 h-7 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2 pt-4 border-t border-black/5 dark:border-white/5">
          <div className="w-full h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-full h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="w-4/5 h-4 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="w-1/3 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 pt-6" />
      </div>
    </div>
  );
};
