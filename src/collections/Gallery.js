const Gallery = {
    slug: 'gallery',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'image',
    },
    fields: [
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Our Products',
            relationTo: 'media', // required
            required: true,
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
};
export default Gallery;