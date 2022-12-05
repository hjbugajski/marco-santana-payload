import path from 'path';

import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';
import NavMenu from './globals/NavMenu';

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Pages],
  globals: [NavMenu],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  },
  cors: [process.env.MONGODB_IP].filter(Boolean)
});
