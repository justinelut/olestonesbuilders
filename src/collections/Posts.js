import formatSlug from "../utils/formatSlug";


const Posts = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'author', 'category', 'tags', 'status'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: "Title",
      required: true
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: "Author",
      required: true
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Category',
      relationTo: 'categories',
      required: true
    },
    {
      name: 'tags',
      type: 'relationship',
      label: 'Tags',
      relationTo: 'tags',
      hasMany: true,
      required: true
    },
    {
      name: 'content',
      type: 'richText',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          formatSlug("title")
        ]
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.createdBy),
      },
    },
    {
      name: 'image', // required
      type: 'upload', // required
      label: 'Featured Image',
      relationTo: 'media', // required
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'summary', // required
      type: 'textarea', // required
      label: 'Blog Summary',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      }
    }
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
}

export default Posts;