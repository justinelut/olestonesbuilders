const YourGoalsSteps = {
    slug: 'yourgoals',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Admin'
    },
    fields: [
        
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Goals Image',
            relationTo: 'media', // required
        },
        {
            name: 'goal', // required
            type: 'array', // required
            label: 'Achive You Goals Steps',
            minRows: 1,
            maxRows: 3,
            labels: {
                singular: 'Achive You Goal Step',
                plural: 'Achive You Goals Steps',
            },
            fields: [ // required
                {
                    name: 'title',
                    type: 'text',
                    label: 'Goal Title',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Goal Description',
                    required: true,
                },
            ],
        }
    ],
};
export default YourGoalsSteps;