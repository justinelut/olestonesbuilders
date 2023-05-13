const Reviews = {
    slug: 'reviews',
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => false
    },
    admin: {
        useAsTitle: 'review',
    },
    fields: [
        {
            name: 'review',
            type: 'text',
            label: 'Review',
            required: true,
        },
        {
            name: 'firstname',
            type: 'text',
            label: 'First Name',
            required: true,
        },
        {
            name: 'lastname',
            type: 'text',
            label: 'Last Name',
            required: true,
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
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
        {
            name: 'approve', // required
            type: 'select', // required
            hasMany: false,
            defaultValue: 'disapproved',
            options: [
                {
                    label: 'Approve Review',
                    value: 'approved',
                },
                {
                    label: 'Disapprove Review',
                    value: 'disapproved',
                },
            ],
            access: {
                update: () => true,
            },
            admin: {
                position: 'sidebar',
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
export default Reviews;