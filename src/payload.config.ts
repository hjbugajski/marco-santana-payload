import path from 'path';

import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';
import NavMenu from './globals/NavMenu';

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
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
  editor: slateEditor({}),
  collections: [Users, Media, Pages],
  globals: [NavMenu],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.MONGODB_IP].filter(Boolean),
});
