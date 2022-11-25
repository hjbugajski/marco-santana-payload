import { GlobalConfig } from 'payload/types';

import { isAdminOrEditor } from '../access';
import link from '../fields/link';

const NavMenu: GlobalConfig = {
  slug: 'nav-menu',
  access: {
    read: () => true,
    update: isAdminOrEditor
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [link]
    }
  ]
};

export default NavMenu;
