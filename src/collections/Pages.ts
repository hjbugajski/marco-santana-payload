import { CollectionConfig } from 'payload/types';

import { isAdminOrEditor } from '../access';
import PhotoSection from '../blocks/PhotoSection';

const Pages: CollectionConfig = {
  slug: 'pages',
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
      name: 'path',
      label: 'Path',
      type: 'text',
      required: true
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [PhotoSection]
    }
  ]
};

export default Pages;
