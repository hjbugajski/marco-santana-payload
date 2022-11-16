import path from 'path';

import { CollectionConfig } from 'payload/types';

import { isAdminOrEditor } from '../utils/access';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Content'
  },
  upload: {
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text',
      required: true
    }
  ]
};

export default Media;
