import path from 'path';

import { CollectionConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import useDataUrl from '../hooks/useDataUrl';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin, Role.Editor),
  },
  hooks: {
    afterChange: [useDataUrl],
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Content',
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'preview',
        height: 1080,
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'center',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'dataUrl',
      type: 'text',
      maxLength: 10000000,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};

export default Media;
