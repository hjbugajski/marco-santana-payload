import { GlobalConfig } from 'payload/types';

import { hasRole, Role } from '../access';
import link from '../fields/link';

const NavMenu: GlobalConfig = {
  slug: 'nav-menu',
  access: {
    read: () => true,
    update: hasRole(Role.Admin),
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [link],
    },
  ],
};

export default NavMenu;
