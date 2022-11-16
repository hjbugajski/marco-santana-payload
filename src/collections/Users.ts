import { CollectionConfig } from 'payload/types';

import { isAdminFieldLevel, isAdminOrSelf, isAdminOrSelfFieldLevel } from '../utils/access';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email'
  },
  access: {
    create: () => true,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: false
        },
        {
          name: 'lastName',
          type: 'text',
          required: false
        }
      ]
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['public'],
      required: true,
      access: {
        read: isAdminOrSelfFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      options: ['admin', 'editor', 'public']
    }
  ]
};

export default Users;
