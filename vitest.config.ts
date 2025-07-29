import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    coverage: {
      exclude: [
        '.nuxt/',
        'server/',
        'tests/',
        'types/',
        'virtual:nuxt:**/',

        // files
        'nuxt.config.ts',
        'tailwind.config.ts',
        'vitest.config.ts',
        'vitest.globals.cfg.ts',
      ],
      provider: 'v8',
    },
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
});
