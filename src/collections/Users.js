const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'firstname',
  },

  auth: {
    depth: 0,
    // useAPIKey: true,
  },
  access: {
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true,
    // Admins can update all, but any other logged in user can only update themselves
    update: () => true,
    // Only admins can delete
    delete: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstname',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'lastname',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'accbalance', // required
      type: 'number', // required
      label: 'Account Balance',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true
      },
    },
    {
      name: 'profilephoto', // required
      type: 'upload', // required
      label: 'Profile Photo',
      relationTo: 'media', // required
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'aboutme',
      type: 'textarea',
      label: 'About Me',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Users;
