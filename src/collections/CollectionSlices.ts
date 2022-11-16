import { CollectionConfig } from 'payload/types';

import { isAdminOrEditor } from '../utils/access';

const CollectionSlices: CollectionConfig = {
  slug: 'collection-slices',
  versions: {
    drafts: true
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'media',
      label: 'Media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true
    }
  ]
};

export default CollectionSlices;
