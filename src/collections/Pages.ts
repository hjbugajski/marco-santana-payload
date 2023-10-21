import { CollectionConfig } from 'payload/types';

import { hasRole, hasRoleOrPublished, Role } from '../access';
import Content from '../blocks/Content';
import Home from '../blocks/Home';
import PhotoSection from '../blocks/PhotoSection';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt', 'updatedAt'],
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
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
    },
    {
      name: 'displayName',
      label: 'Display name',
      type: 'checkbox',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Head',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Home, Content, PhotoSection],
            },
          ],
        },
      ],
    },
  ],
};

export default Pages;
