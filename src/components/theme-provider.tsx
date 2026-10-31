'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Client boundary so the server root layout can render next-themes' provider
export const ThemeProvider = (props: React.ComponentProps<typeof NextThemesProvider>) => (
    <NextThemesProvider {...props} />
);
