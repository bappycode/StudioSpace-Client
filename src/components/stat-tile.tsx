import type { LucideIcon } from 'lucide-react';

type StatTileProps = {
    icon: LucideIcon;
    label: string;
    value: string;
};

const StatTile = ({ icon: Icon, label, value }: StatTileProps) => (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
        </span>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    </div>
);

export default StatTile;
