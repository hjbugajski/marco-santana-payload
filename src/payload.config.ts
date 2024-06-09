import path from 'path';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';

const useDataUrlPath = path.resolve(__dirname, 'hooks/useDataUrl');
const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject.ts');

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [useDataUrlPath]: mockModulePath,
        },
      },
    }),
    user: Users.slug,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
    connectOptions: {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DATABASE,
    },
  }),
  editor: lexicalEditor({}),
  collections: [Media, Pages, Users],
  plugins: [
    nestedDocs({
      collections: [Pages.slug],
      parentFieldSlug: 'parent',
      breadcrumbsFieldSlug: 'breadcrumbs',
      // @ts-expect-error – valid field
      generateLabel: (_, doc) => doc?.title,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.MONGODB_IP].filter(Boolean),
  csrf: [
    process.env.SERVER_URL,
    process.env.DOMAIN,
    process.env.PAYLOAD_DOMAIN,
    process.env.PAYLOAD_PREVIEW_DOMAIN,
  ].filter(Boolean),
  serverURL: process.env.SERVER_URL,
});
