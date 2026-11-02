import { getClientToken, requestServer } from '@/lib/api';

export const studioCategories = [
    { slug: 'photo-studio', label: 'Photo Studio', pluralLabel: 'Photo Studios' },
    { slug: 'film-stage', label: 'Film Stage', pluralLabel: 'Sound Stages' },
    { slug: 'podcast-room', label: 'Podcast Room', pluralLabel: 'Podcast Rooms' },
    { slug: 'music-suite', label: 'Music Suite', pluralLabel: 'Music Suites' },
    { slug: 'art-workshop', label: 'Art Workshop', pluralLabel: 'Art Workshops' },
] as const;

export type CategorySlug = (typeof studioCategories)[number]['slug'];

export const sortOptions = [
    { value: 'newest', label: 'Newest Listings' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
] as const;

export type SortOption = (typeof sortOptions)[number]['value'];

export type Review = {
    name: string;
    rating: number;
    comment: string;
    date: string;
};

export type Studio = {
    _id: string;
    title: string;
    category: CategorySlug;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    image: string;
    gallery: string[];
    amenities: string[];
    overview: string;
    ownerName: string;
    ownerEmail: string;
    createdAt: string;
    rating?: number;
    reviewCount?: number;
    reviews?: Review[];
};

export type StudioInput = Pick<
    Studio,
    | 'title'
    | 'category'
    | 'hourlyRate'
    | 'securityDeposit'
    | 'maxCapacity'
    | 'location'
    | 'image'
    | 'gallery'
    | 'amenities'
    | 'overview'
>;

export type StudioOwner = { name: string; email: string };

export type StudioQuery = {
    category?: CategorySlug;
    search?: string;
    sort: SortOption;
    minRate?: number;
    maxRate?: number;
};

type SearchParams = Record<string, string | string[] | undefined>;

export const getCategoryLabel = (slug: string) =>
    studioCategories.find((category) => category.slug === slug)?.label ?? slug;

export const formatAverageRating = (studios: Studio[]) => {
    const ratedStudios = studios.filter((studio) => studio.rating);
    if (ratedStudios.length === 0) return '—';

    const total = ratedStudios.reduce((sum, studio) => sum + (studio.rating ?? 0), 0);
    return (total / ratedStudios.length).toFixed(1);
};

export const getStudios = (category?: CategorySlug) =>
    requestServer<Studio[]>(category ? `/studios/category/${category}` : '/studios');

export const getFeaturedStudios = () => requestServer<Studio[]>('/featured-studios');

export const getStudio = (id: string) => requestServer<Studio | null>(`/studios/${id}`).catch(() => null);

export const getMyListings = (email: string, token: string) =>
    requestServer<Studio[]>(`/my-listings/${encodeURIComponent(email)}`, { token });

export const createStudio = async (input: StudioInput, ownerName: string) =>
    requestServer('/add-studios', {
        method: 'POST',
        body: { ...input, ownerName, createdAt: new Date().toISOString() },
        token: await getClientToken(),
    });

export const updateStudio = async (id: string, input: StudioInput) =>
    requestServer(`/studios/${id}`, { method: 'PATCH', body: input, token: await getClientToken() });

export const deleteStudio = async (id: string) =>
    requestServer(`/studios/${id}`, { method: 'DELETE', token: await getClientToken() });

const isCategorySlug = (value?: string): value is CategorySlug =>
    studioCategories.some((category) => category.slug === value);

const isSortOption = (value?: string): value is SortOption =>
    sortOptions.some((option) => option.value === value);

export const toRate = (value?: string | null) => {
    if (!value) return undefined;
    const rate = Number(value);
    return Number.isFinite(rate) && rate >= 0 ? rate : undefined;
};

const getParam = (params: SearchParams, key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
};

export const parseStudioQuery = (params: SearchParams): StudioQuery => {
    const category = getParam(params, 'category');
    const sort = getParam(params, 'sort');

    return {
        category: isCategorySlug(category) ? category : undefined,
        search: getParam(params, 'q')?.trim() || undefined,
        sort: isSortOption(sort) ? sort : 'newest',
        minRate: toRate(getParam(params, 'min')),
        maxRate: toRate(getParam(params, 'max')),
    };
};

export const buildStudiosHref = ({ category, search, sort, minRate, maxRate }: Partial<StudioQuery>) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('q', search);
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (minRate !== undefined) params.set('min', String(minRate));
    if (maxRate !== undefined) params.set('max', String(maxRate));

    const queryString = params.toString();
    return queryString ? `/studios?${queryString}` : '/studios';
};

const compareStudios: Record<SortOption, (a: Studio, b: Studio) => number> = {
    newest: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    'price-asc': (a, b) => a.hourlyRate - b.hourlyRate,
    'price-desc': (a, b) => b.hourlyRate - a.hourlyRate,
};

const matchesSearch = (studio: Studio, term: string) =>
    [studio.title, studio.location, ...studio.amenities].some((field) => field.toLowerCase().includes(term));

export const filterStudios = (studios: Studio[], { search, sort, minRate, maxRate }: StudioQuery) => {
    const term = search?.toLowerCase();

    return studios
        .filter(
            (studio) =>
                (!term || matchesSearch(studio, term)) &&
                (minRate === undefined || studio.hourlyRate >= minRate) &&
                (maxRate === undefined || studio.hourlyRate <= maxRate)
        )
        .sort(compareStudios[sort]);
};
