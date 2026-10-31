'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();

    // Both icons render and CSS picks one, so server and client markup match before the theme is known
    return (
        <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            <SunIcon className="hidden dark:block" />
            <MoonIcon className="dark:hidden" />
        </Button>
    );
};

export default ThemeToggle;
