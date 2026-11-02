'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from 'cn';
import { buttonVariants } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/effect-fade';

const AUTOPLAY_DELAY = 6000;

const slides = [
    {
        label: 'Photo Studios',
        title: 'Your best shot needs the right light',
        text: 'Book daylight cyc walls and fully lit sets by the hour, with strobes, softboxes and backdrops ready when you arrive.',
        image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=2000&q=80',
    },
    {
        label: 'Sound Stages',
        title: 'Roll camera on a stage built for it',
        text: 'Blackbox and green-screen stages with lighting grids, power and loading docks for shoots of every size.',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80',
    },
    {
        label: 'Podcast Rooms',
        title: 'Sound that makes listeners lean in',
        text: 'Acoustically treated rooms with broadcast mics and multitrack recording, set up for you and your guests.',
        image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=2000&q=80',
    },
    {
        label: 'Music Suites',
        title: 'Record where the magic happens',
        text: 'Tracking rooms and mix suites with analog consoles, outboard gear and instruments ready to play.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=2000&q=80',
    },
];

const revealClass =
    'translate-y-4 opacity-0 transition duration-700 motion-reduce:transition-none in-[.swiper-slide-active]:translate-y-0 in-[.swiper-slide-active]:opacity-100';

const HeroSlider = () => {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const paginationRef = useRef<HTMLDivElement>(null);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:pt-6">
            <div className="relative isolate h-[68svh] max-h-140 min-h-120 overflow-hidden rounded-3xl bg-black text-white ring-1 ring-foreground/10">
                <Swiper
                    modules={[Autoplay, EffectFade, Keyboard]}
                    effect="fade"
                    loop
                    speed={900}
                    keyboard={{ enabled: true }}
                    autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    onSwiper={setSwiper}
                    onRealIndexChange={(instance) => setActiveIndex(instance.realIndex)}
                    onAutoplayTimeLeft={(_, __, percentage) =>
                        paginationRef.current?.style.setProperty('--hero-progress', String(1 - percentage))
                    }
                    className="h-full"
                >
                    {slides.map(({ label, title, text, image }, index) => {
                        const Heading = index === 0 ? 'h1' : 'h2';

                        return (
                            <SwiperSlide key={label}>
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1280px) 1248px, 100vw"
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    fetchPriority={index === 0 ? 'high' : 'auto'}
                                    className="object-cover motion-safe:transition-transform motion-safe:duration-[7000ms] motion-safe:ease-out in-[.swiper-slide-active]:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30 lg:bg-linear-to-r lg:from-black/85 lg:via-black/55 lg:to-black/10" />

                                <div className="relative flex h-full items-center px-6 pb-16 sm:px-12">
                                    <div className="max-w-2xl space-y-6">
                                        <span
                                            className={cn(
                                                'inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase backdrop-blur',
                                                revealClass
                                            )}
                                        >
                                            {label}
                                        </span>
                                        <Heading
                                            className={cn(
                                                'text-4xl font-bold tracking-tight text-balance sm:text-5xl',
                                                revealClass,
                                                'delay-100'
                                            )}
                                        >
                                            {title}
                                        </Heading>
                                        <p className={cn('max-w-xl text-lg text-white/75', revealClass, 'delay-200')}>
                                            {text}
                                        </p>
                                        <div className={cn('flex flex-wrap gap-3', revealClass, 'delay-300')}>
                                            <Link href="/studios" className={buttonVariants({ size: 'lg', className: 'h-11 px-6' })}>
                                                Explore Studios <ArrowRightIcon />
                                            </Link>
                                            <Link
                                                href="/add-studio"
                                                className="inline-flex h-11 items-center rounded-lg border border-white/40 bg-white/10 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
                                            >
                                                Host Your Space
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <div ref={paginationRef} className="absolute inset-x-0 bottom-0 z-10">
                    <div className="grid grid-cols-4 gap-3 px-6 pb-6 sm:gap-6 sm:px-12">
                        {slides.map(({ label }, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => swiper?.slideToLoop(index)}
                                    aria-label={`Show slide ${index + 1}: ${label}`}
                                    aria-current={isActive}
                                    className="group py-2 text-left"
                                >
                                    <span className="block h-0.5 overflow-hidden rounded-full bg-white/25">
                                        <span
                                            className="block h-full origin-left bg-primary"
                                            style={{ scale: isActive ? 'var(--hero-progress, 0) 1' : '0 1' }}
                                        />
                                    </span>
                                    <span className="mt-3 hidden items-baseline gap-2 text-sm sm:flex">
                                        <span className="font-mono text-xs text-white/50">0{index + 1}</span>
                                        <span
                                            className={cn(
                                                'transition-colors',
                                                isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                                            )}
                                        >
                                            {label}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
