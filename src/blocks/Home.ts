import { Block } from 'payload/types';

import { blockFields } from '../fields';

const Home: Block = {
  slug: 'home',
  fields: [
    blockFields({
      name: 'homeFields',
      fields: [
        {
          name: 'subTitle',
          label: 'Sub-Title',
          type: 'text'
        },
        {
          type: 'array',
          name: 'instagramLinks',
          label: 'Instagram Links',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'instagramMedia',
              label: 'Media',
              type: 'relationship',
              relationTo: 'media',
              required: true
            }
          ]
        }
      ]
    })
  ]
};

export default Home;
