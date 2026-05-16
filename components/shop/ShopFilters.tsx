'use client';

import type { Category, Size } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * ShopFilters — sidebar of filter controls for the shop page.
 *
 * Each filter section is a checkbox group. State is owned by the parent
 * (ShopGrid) and passed in via props — keeps this component a pure renderer.
 */
export interface FilterState {
  categories: Category[];
  sizes: Size[];
  colors: string[];
  /** null == no upper bound. */
  maxPriceCents: number | null;
  /** When true, restrict to products flagged as the latest drop. Set via
   *  the /shop?filter=latest entry point — no sidebar control. */
  latestOnly: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  categories: [],
  sizes: [],
  colors: [],
  maxPriceCents: null,
  latestOnly: false,
};

const CATEGORIES: Category[] = ['hoodies', 'tees', 'outerwear', 'bottoms', 'accessories'];
const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Onyx', 'Bone', 'Graphite', 'Stone', 'Oxblood'];
const PRICE_BUCKETS = [
  { label: 'Under $100', value: 10000 },
  { label: 'Under $200', value: 20000 },
  { label: 'Under $300', value: 30000 },
  { label: 'All', value: null },
];

export function ShopFilters({
  filters,
  onChange,
  productCount,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  productCount: number;
}) {
  // Toggle helper for the array-valued filters.
  const toggle = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const clearAll = () => onChange(INITIAL_FILTERS);
  const hasAny =
    filters.categories.length +
      filters.sizes.length +
      filters.colors.length +
      (filters.maxPriceCents === null ? 0 : 1) +
      (filters.latestOnly ? 1 : 0) >
    0;

  return (
    <aside aria-label="Product filters" className="space-y-10 md:sticky md:top-24 md:self-start">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-bone">
          Filter <span className="text-bone-muted">({productCount})</span>
        </p>
        {hasAny && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs uppercase tracking-widest text-bone-muted underline underline-offset-4 hover:text-bone"
          >
            Clear
          </button>
        )}
      </div>

      <FilterSection title="Category">
        {CATEGORIES.map((c) => (
          <FilterCheckbox
            key={c}
            label={c}
            checked={filters.categories.includes(c)}
            onChange={() =>
              onChange({ ...filters, categories: toggle(filters.categories, c) })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, s) })}
              aria-pressed={filters.sizes.includes(s)}
              className={cn(
                'border px-3 py-2 text-xs uppercase tracking-widest transition',
                filters.sizes.includes(s)
                  ? 'border-bone bg-bone text-ink'
                  : 'border-bone/20 text-bone hover:border-bone',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        {COLORS.map((c) => (
          <FilterCheckbox
            key={c}
            label={c}
            checked={filters.colors.includes(c)}
            onChange={() =>
              onChange({ ...filters, colors: toggle(filters.colors, c) })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {PRICE_BUCKETS.map((b) => (
          <FilterRadio
            key={b.label}
            name="price"
            label={b.label}
            checked={filters.maxPriceCents === b.value}
            onChange={() => onChange({ ...filters, maxPriceCents: b.value })}
          />
        ))}
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm capitalize text-bone hover:text-bone-muted">
      <span
        className={cn(
          'h-4 w-4 border transition',
          checked ? 'border-bone bg-bone' : 'border-bone/30',
        )}
        aria-hidden="true"
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

function FilterRadio({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-bone hover:text-bone-muted">
      <span
        className={cn(
          'h-4 w-4 rounded-full border transition',
          checked ? 'border-bone bg-bone' : 'border-bone/30',
        )}
        aria-hidden="true"
      />
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}
