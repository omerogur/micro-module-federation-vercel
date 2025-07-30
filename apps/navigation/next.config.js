import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { withMicrofrontends } from '@vercel/microfrontends/next/config';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@company/shared-styles', '@company/ui-components'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: '_mf_navigation',
        filename: `static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        exposes: {
          './header': './pages/_navigation/header/index.tsx',
          './footer': './pages/_navigation/footer/index.tsx',
          './sidebar': './pages/_navigation/sidebar/index.tsx',
          './app': './pages/_app.tsx',
        },
      }),
    );

    return config;
  },
};

export default withVercelToolbar()(
  withMicrofrontends(nextConfig, { supportPagesRouter: true }),
);
