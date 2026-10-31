'use client';

import { useState } from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const presetAmenities = [
    'Wi-Fi',
    'Parking',
    'Air Conditioning',
    'Lighting Kit',
    'Backdrops',
    'Green Screen',
    'Soundproofing',
    'Makeup Station',
    'Changing Room',
    'Kitchenette',
    'Props Library',
    'Wheelchair Access',
];

type AmenityPickerProps = {
    value: string[];
    onChange: (amenities: string[]) => void;
};

const AmenityPicker = ({ value, onChange }: AmenityPickerProps) => {
    const [custom, setCustom] = useState('');
    // Keep presets first, then any custom amenities (including ones loaded from an existing studio)
    const options = [...new Set([...presetAmenities, ...value])];

    const toggle = (amenity: string) =>
        onChange(value.includes(amenity) ? value.filter((item) => item !== amenity) : [...value, amenity]);

    const addCustom = () => {
        const amenity = custom.trim();
        if (amenity && !value.includes(amenity)) onChange([...value, amenity]);
        setCustom('');
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {options.map((amenity) => {
                    const selected = value.includes(amenity);

                    return (
                        <button
                            key={amenity}
                            type="button"
                            onClick={() => toggle(amenity)}
                            aria-pressed={selected}
                            className={cn(
                                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors',
                                selected
                                    ? 'border-primary bg-primary/10 text-foreground'
                                    : 'text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                            )}
                        >
                            {selected && <CheckIcon className="size-3.5 text-primary" />}
                            {amenity}
                        </button>
                    );
                })}
            </div>

            <div className="flex max-w-sm gap-2">
                <Input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    onKeyDown={(e) => {
                        // Enter adds the tag instead of submitting the whole form
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addCustom();
                        }
                    }}
                    placeholder="Add your own, e.g. Cyc Wall"
                    aria-label="Custom amenity"
                    className="h-9"
                />
                <Button type="button" variant="outline" className="h-9" onClick={addCustom} disabled={!custom.trim()}>
                    <PlusIcon /> Add
                </Button>
            </div>
        </div>
    );
};

export default AmenityPicker;
