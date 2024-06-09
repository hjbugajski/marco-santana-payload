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
import { Block, Field } from 'payload/types';

import { heading } from '../fields/heading';
import { linkGroup, richTextFields as linkRichTextFields } from '../fields/link';
import { subheading } from '../fields/subheading';
import { deepMerge } from '../utils/deepMerge';

import Gallery from './Gallery';

const Section: Block = {
  slug: 'section',
  interfaceName: 'BlockSection',
  fields: [
    heading,
    subheading,
    {
      name: 'hasLink',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    deepMerge<Field>(linkGroup, {
      admin: {
        condition: (_, siblingData) => siblingData?.hasLink,
      },
    }),
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
          LinkFeature({ fields: linkRichTextFields }),
          BlocksFeature({ blocks: [Gallery] }),
        ],
      }),
    },
  ],
};

export default Section;
