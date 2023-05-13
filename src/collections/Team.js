const Team = {
    slug: 'olestonesTeam',
    access: {
        read: () => true,
        update: () => true,
        delete: () => true
    },
    admin: {
        useAsTitle: 'fullnames',
    },
    fields: [
        {
            name: 'fullnames', // required
            type: 'text', // required
            label: 'Full Team Member Names',
            required: true,
        },
        {
            name: 'title', // required
            type: 'text', // required
            label: 'Team Member Title',
            required: true,
        },
        {
            name: 'description', // required
            type: 'textarea', // required
            label: 'Team Member Description',
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Team Member Image',
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
export default Team;