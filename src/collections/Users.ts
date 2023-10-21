import { CollectionConfig } from 'payload/types';

import { hasRole, hasRoleField, hasRoleOrSelf, hasRoleOrSelfField, Role } from '../access';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    create: hasRole(Role.Admin),
    read: hasRoleOrSelf(Role.Admin),
    update: hasRoleOrSelf(Role.Admin),
    delete: hasRole(Role.Admin),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: false,
        },
        {
          name: 'lastName',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        read: hasRoleOrSelfField(Role.Admin),
        create: hasRoleField(Role.Admin),
        update: hasRoleField(Role.Admin),
      },
      required: true,
      hasMany: true,
      defaultValue: [Role.Editor],
      options: [Role.Admin, Role.Editor],
    },
  ],
};

export default Users;
