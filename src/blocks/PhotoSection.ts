import { Block } from 'payload/types';

import { blockFields } from '../fields';

const PhotoSection: Block = {
  slug: 'photo-sections',
  fields: [
    blockFields({
      name: 'sectionFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text'
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
    })
  ]
};

export default PhotoSection;
