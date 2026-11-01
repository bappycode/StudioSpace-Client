'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';

const navButtonClass = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur hover:bg-background';

const StudioGallery = ({ images, title }: { images: string[]; title: string }) => {
    const [active, setActive] = useState(0);
    const count = images.length;
    const showPrevious = () => setActive(active === 0 ? count - 1 : active - 1);
    const showNext = () => setActive(active === count - 1 ? 0 : active + 1);

    return (
        <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-muted">
                <Image
                    src={images[active]}
                    alt={`${title} — photo ${active + 1} of ${count}`}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    className="object-cover"
                />
                {count > 1 && (
                    <>
                        <Button
                            variant="secondary"
                            size="icon-lg"
                            aria-label="Previous photo"
                            onClick={showPrevious}
                            className={cn(navButtonClass, 'left-4')}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon-lg"
                            aria-label="Next photo"
                            onClick={showNext}
                            className={cn(navButtonClass, 'right-4')}
                        >
                            <ChevronRightIcon />
                        </Button>
                        <span className="absolute right-4 bottom-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                            {active + 1} / {count}
                        </span>
                    </>
                )}
            </div>

            {count > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                    {images.map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setActive(index)}
                            aria-label={`Show photo ${index + 1}`}
                            aria-current={index === active}
                            className={cn(
                                'relative aspect-4/3 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-background transition',
                                index === active ? 'ring-primary' : 'ring-transparent opacity-60 hover:opacity-100'
                            )}
                        >
                            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudioGallery;
