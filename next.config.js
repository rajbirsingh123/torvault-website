/**
 * `next-intl/plugin`'s `createNextIntlPlugin` would normally set this up,
 * but it unconditionally `require()`s `@swc/core` for an optional codegen
 * feature we don't use, and the native binding for that package is broken
 * in this environment (ERR_SWC_NATIVE_LOAD). The plugin's only essential
 * effect for routing/messages to work is this Turbopack resolve alias, so
 * it's set directly here instead of going through the plugin.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
};

module.exports = nextConfig;
