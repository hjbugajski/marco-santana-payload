import path from 'path';

import { buildConfig } from 'payload/config';

import Media from './collections/Media';
import Pages from './collections/Pages';
import Users from './collections/Users';

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  },
  cors: [process.env.MONGODB_IP].filter(Boolean)
});
