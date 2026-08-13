/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, ArrowUpRight, Loader2, Plus } from 'lucide-react';

// ইমেজ সাইজ কমিয়ে এবং WebP ফরম্যাট ব্যবহার করে অপ্টিমাইজ করা হয়েছে (&fm=webp)
const fallbackImages = [
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80&fm=webp',
  'https://images.unsplash.com/photo-1496469888073-80de7e9b97cb?w=400&auto=format&fit=crop&q=80&fm=webp'
];

const rawImages = [
  'Workshop_Debate Competition_2025-05-03.jpg',
  'Workshop_Debate Competition_2025-05-03_1.jpg',
  'Workshop_Debate Competition_2025-05-03_2.jpg',
  'Workshop_Debate Competition_2025-05-03_3.jpg',
  'Workshop_Debate Competition_2025-05-03_4.jpg',
  'Workshop_Debate Competition_2025-05-03_5.jpg',
  'Workshop_Debate Competition_2025-05-03_6.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_1.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_2.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_3.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_4.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_5.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_6.jpg',
  'Seminars_Ministry of Woman & Child_2026-01-17_7.jpg',
  'Events_Iftar Party 26_2026-03-07.jpg',
  'Events_Iftar Party 26_2026-03-07_1.jpg',
  'Events_Iftar Party 26_2026-03-07_2.jpg',
  'Events_Iftar Party 26_2026-03-07_3.jpg',
  'Events_Iftar Party 26_2026-03-07_4.jpg',
  'Events_Iftar Party 26_2026-03-07_5.jpg',
  'Events_Iftar Party 26_2026-03-07_6.jpg',
  'Events_Iftar Party 26_2026-03-07_7.jpg',
  'Events_Iftar Party 26_2026-03-07_8.jpg',
  'Events_Iftar Party 26_2026-03-07_9.jpg',
  'Events_Iftar Party 26_2026-03-07_10.jpg',
  'Events_Iftar Party 26_2026-03-07_11.jpg',
  'Awards_Youth Day 2025_2025-08-12.jpg',
  'Awards_Youth Day 2025_2025-08-12_1.jpg',
  'Awards_Youth Day 2025_2025-08-12_2.jpg',
  'Awards_Youth Day 2025_2025-08-12_3.jpg',
  'Awards_Youth Day 2025_2025-08-12_4.jpg',
  'Awards_Youth Day 2025_2025-08-12_5.jpg',
  'Awards_Youth Day 2025_2025-08-12_6.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_1.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_2.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_3.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_4.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_5.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_6.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_7.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_8.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_9.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_10.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_11.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_12.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_13.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_14.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_15.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_16.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_17.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_18.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_19.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_20.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_21.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_22.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_23.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_24.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_25.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_26.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_27.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_28.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_29.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_30.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_31.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_32.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_33.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_34.jpg',
  'Cultural Programs_BGI Cultural Fest 2026_2026-02-20_35.jpg',
];

interface GalleryItem {
  id: number;
  url: string;
  backupUrl: string;
  title: string;
  category: string;
  date: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer h-72 flex flex-col justify-end"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800/50 animate-pulse z-0">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
        </div>
      )}

      <img 
        src={item.url} 
        alt={item.title} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        }`} 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== item.backupUrl) {
            target.src = item.backupUrl;
          }
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity z-10"></div>

      <div className="relative p-5 text-white text-left z-20 space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-[8px] font-mono font-bold uppercase tracking-wider">
          <Tag className="w-2.5 h-2.5 text-emerald-300 shrink-0" />
          <span>{item.category}</span>
        </span>
        <h3 className="font-sans font-extrabold text-xs tracking-tight line-clamp-1">{item.title}</h3>
        
        <div className="flex justify-between items-center text-[9px] text-zinc-300 font-mono pt-1.5 border-t border-white/10">
          <span className="flex items-center space-x-1"><Calendar className="w-3 h-3" /> <span>{item.date}</span></span>
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
        </div>
      </div>
    </div>
  );
}

export default function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // প্রতি পেজে ইমেজ লিমিট ১০ রাখার জন্য স্টেট
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const categories = ['All', 'Events', 'Workshops', 'Volunteers', 'Awards', 'Cultural Programs', 'Seminars'];

  const galleryItems: GalleryItem[] = rawImages.map((fileName, index) => {
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const [category, title, date] = nameWithoutExt.split('_');

    return {
      id: index + 1,
      url: `/gallery/${fileName}`,
      backupUrl: fallbackImages[index % fallbackImages.length],
      category: category || 'Events',
      title: title || 'BGI Community Archive',
      date: date || 'Recent'
    };
  });

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // ফিল্টার করা আইটেম থেকে কেবল visibleCount (১০টি) পরিমাণ ইমেজ স্লাইস করে নেওয়া
  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  };

  return (
    <div id="gallery-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
      
      {/* Title Header */}
      <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Media Archives</span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-zinc-900 dark:text-white">BGI Community Gallery</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Archived moments of triumph, scientific symposia, and emergency responses.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850 rounded-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { 
                setSelectedCategory(cat); 
                setLightboxIndex(null); 
                setVisibleCount(10); // ক্যাটাগরি চেঞ্জ করলে আবার প্রথমে ১০টি দেখাবে
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'text-emerald-500 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedItems.map((item, index) => (
          <GalleryCard 
            key={item.id}
            item={item}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {/* Load More Button - আরও ইমেজ থাকলে তবেই বাটনটি দৃশ্যমান হবে */}
      {visibleCount < filteredItems.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white font-sans font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 group"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>Load More Images</span>
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && displayedItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md text-white select-none">
            
            <div className="w-full max-w-5xl flex items-center justify-between mb-4 px-2">
              <div className="text-left">
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block">{displayedItems[lightboxIndex].category} Node</span>
                <h3 className="font-sans font-black text-sm text-white">{displayedItems[lightboxIndex].title}</h3>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full max-w-4xl max-h-[70vh] flex items-center justify-center">
              <button 
                onClick={handlePrev}
                className="absolute left-4 p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white hover:scale-105 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img 
                key={displayedItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={displayedItems[lightboxIndex].url} 
                alt={displayedItems[lightboxIndex].title} 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== displayedItems[lightboxIndex].backupUrl) {
                    target.src = displayedItems[lightboxIndex].backupUrl;
                  }
                }}
              />

              <button 
                onClick={handleNext}
                className="absolute right-4 p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white hover:scale-105 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center font-mono text-xs text-zinc-400 mt-6 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              Image {lightboxIndex + 1} of {displayedItems.length} &bull; {displayedItems[lightboxIndex].date}
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}