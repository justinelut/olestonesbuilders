const Emails = {
    slug: 'olestonesEmails',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'email', // required
            type: 'email', // required
            label: 'Olestones Emails',
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
export default Emails;