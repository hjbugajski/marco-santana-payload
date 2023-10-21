import { Field } from 'payload/types';

const link: Field = {
  type: 'row',
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Internal link',
          value: 'reference',
        },
        {
          label: 'External link',
          value: 'external',
        },
      ],
      defaultValue: 'reference',
      admin: {
        layout: 'horizontal',
        width: '50%',
      },
      required: true,
    },
    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
      admin: {
        width: '50%',
        style: {
          alignSelf: 'flex-end',
        },
      },
    },
    {
      name: 'reference',
      label: 'Page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'external',
      },
    },
    {
      name: 'url',
      label: 'External URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'external',
      },
    },
  ],
};

export default link;
