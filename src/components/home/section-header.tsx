import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    description: string;
    action?: { href: string; label: string };
};

// Shared heading block so every home section uses the same type scale and spacing
const SectionHeader = ({ eyebrow, title, description, action }: SectionHeaderProps) => (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        </div>
        {action && (
            <Link
                href={action.href}
                className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
                {action.label} <ArrowRightIcon className="size-4" />
            </Link>
        )}
    </div>
);

export default SectionHeader;
