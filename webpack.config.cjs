const path = require('path');
const { UniversalFederationPlugin } = require('@module-federation/node');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const sharedConfig = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
};

const clientConfig = {
  ...sharedConfig,
  name: 'client',
  mode: isProd ? 'production' : 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].js',
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      ...sharedConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new UniversalFederationPlugin({
      name: 'homepageUi',
      filename: 'remoteEntry.js',
      isServer: false,
      library: { type: 'var', name: 'homepageUi' },
      exposes: {
        './HomepageFragment': './src/components/HomepageFragment.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        '@dipesh.singh/proton': { singleton: true, requiredVersion: false },
        '@dipesh.singh/commerce-ui': { singleton: true, requiredVersion: false },
      },
    }),
  ],
};

const serverConfig = {
  ...sharedConfig,
  name: 'server',
  mode: isProd ? 'production' : 'development',
  target: false,
  entry: path.resolve(__dirname, 'src/components/HomepageFragment.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].js',
    publicPath: process.env.SSR_HOMEPAGE_PUBLIC_PATH || 'auto',
    clean: true,
  },
  module: {
    rules: [
      ...sharedConfig.module.rules,
      {
        test: /\.css$/,
        loader: 'null-loader',
      },
    ],
  },
  plugins: [
    new UniversalFederationPlugin({
      name: 'homepageUi',
      filename: 'remoteEntry.js',
      isServer: true,
      library: { type: 'commonjs-module' },
      exposes: {
        './HomepageFragment': './src/components/HomepageFragment.tsx',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
        '@dipesh.singh/proton': { singleton: true, eager: true, requiredVersion: false },
        '@dipesh.singh/commerce-ui': { singleton: true, eager: true, requiredVersion: false },
      },
    }),
  ],
};

module.exports = [clientConfig, serverConfig];
