import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import pwa from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://9dfbe926.astropwa-54d.pages.dev',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    pwa({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      devOptions: {
        enabled: true,
        suppressWarnings: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg,webp,json,xml}'],
        globDirectory: 'dist',
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [/^\/posts\//, /^\/categories\//],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => {
              return request.destination === 'document' || url.pathname.endsWith('/');
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: { 
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              networkTimeoutSeconds: 3,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /.*\.(?:js|css)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /.*\.(?:json|xml)/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'data-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
              },
              networkTimeoutSeconds: 3
            }
          }
        ]
      },
      manifest: {
        name: 'AstroPWA - Offline Blog',
        short_name: 'AstroPWA',
        description: 'Fully offline-capable PWA blog built with Astro',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});