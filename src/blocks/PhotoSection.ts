import { Block } from 'payload/types';

import { blockFields } from '../fields';
import link from '../fields/link';

const PhotoSection: Block = {
  slug: 'photoSection',
  fields: [
    blockFields({
      name: 'photoSectionFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text'
        },
        {
          name: 'showPageLink',
          label: 'Page Link',
          type: 'checkbox'
        },
        {
          name: 'pageLink',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.showPageLink === true
          },
          fields: [link]
        },
        {
          name: 'scrollContainer',
          label: 'Scroll container',
          type: 'checkbox'
        },
        {
          name: 'photoSectionMedia',
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
