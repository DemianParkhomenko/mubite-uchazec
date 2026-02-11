# @mubite/shared-theme

Shared Tailwind CSS theme configuration for the MUBITE monorepo.

## Usage

In your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import { colors, typography, spacing } from '@mubite/shared-theme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      spacing,
    },
  },
  darkMode: 'class',
};

export default config;
```

## Features

- **Consistent Colors**: Shared color palette with primary, secondary, semantic, and domain-specific colors
- **Typography**: Unified font families and sizes using Geist fonts
- **Spacing**: Custom spacing values for album cards and containers
- **Dark Mode**: Built-in support for light/dark themes
- **Type-Safe**: Full TypeScript support with exported types
