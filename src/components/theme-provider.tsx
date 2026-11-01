'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = (props: React.ComponentProps<typeof NextThemesProvider>) => (
    <NextThemesProvider {...props} />
);
