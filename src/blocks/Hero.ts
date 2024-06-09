import { Block, Field } from 'payload/types';

import { linkArray } from '../fields/link';
import { subheading } from '../fields/subheading';
import { deepMerge } from '../utils/deepMerge';

const Hero: Block = {
  slug: 'hero',
  interfaceName: 'BlockHero',
  fields: [
    subheading,
    deepMerge<Field>(linkArray, {
      required: true,
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    }),
  ],
};

export default Hero;
