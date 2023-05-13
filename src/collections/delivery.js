const Delivery = {
    slug: 'delivery',
    access: {
        read: () => true,
        update: () => true,
        delete: () => true
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name', // required
            type: 'text', // required
            label: 'Delivery Method',
            required: true,
        },
        {
            name: 'description', // required
            type: 'textarea', // required
            label: 'Delivery Description',
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Delivery Logo',
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
export default Delivery;