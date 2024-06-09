import {
  AlignFeature,
  BlocksFeature,
  BoldTextFeature,
  HeadingFeature,
  ItalicTextFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  UnderlineTextFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { CollectionConfig, FieldHook } from 'payload/types';

import { hasRole, hasRoleOrPublished, Role } from '../access';
import Gallery from '../blocks/Gallery';
import Hero from '../blocks/Hero';
import Section from '../blocks/Section';
import RowLabel from '../components/RowLabel';
import { richTextFields } from '../fields/link';
import { slugify } from '../utils/slugify';

const useSlug: FieldHook = ({ operation, siblingData }) => {
  if (operation === 'create' || operation === 'update') {
    return slugify(siblingData?.title);
  }
};

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: hasRoleOrPublished(Role.Admin, Role.Editor),
    create: hasRole(Role.Admin, Role.Editor),
    update: hasRole(Role.Admin, Role.Editor),
    delete: hasRole(Role.Admin, Role.Editor),
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [useSlug],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: [
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
          ParagraphFeature(),
          BoldTextFeature(),
          ItalicTextFeature(),
          UnderlineTextFeature(),
          StrikethroughTextFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          SuperscriptTextFeature(),
          SubscriptTextFeature(),
          AlignFeature(),
          LinkFeature({ fields: richTextFields }),
          BlocksFeature({ blocks: [Hero, Section, Gallery] }),
        ],
      }),
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ siblingData }) => ({
        slug: {
          // @ts-expect-error – valid field
          not_equals: siblingData?.slug,
        },
      }),
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        hidden: true,
        position: 'sidebar',
        readOnly: true,
        components: {
          RowLabel: RowLabel('label', 'Breadcrumb'),
        },
      },
      fields: [
        {
          name: 'url',
          label: 'Path',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
};

export default Pages;
