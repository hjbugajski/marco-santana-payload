import path from 'path';

import { CollectionConfig } from 'payload/types';

import { hasRole, Role } from '../access';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin, Role.Editor),
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Content',
  },
  upload: {
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'preview',
        height: 2000,
      },
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
