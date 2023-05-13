const Location = {
    slug: 'location',
    access: {
        create: () => true,
        read: () => false,
        update: () => false
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
        },
        {
            name: 'counties', // required
            type: 'array', // required
            label: 'Counties & Subcounties',
            minRows: 1,
            maxRows: 1000,
            labels: {
                singular: 'County & Subcounty',
                plural: 'Counties & Subcounties',
            },
            fields: [ // required
                {
                    name: 'county',
                    type: 'text',
                    label: 'County Name',
                    required: true,
                },
                {
                    name: 'code',
                    type: 'text',
                    label: 'Code',
                    required: true,
                },
                {
                    name: 'subcounties', // required
                    type: 'array', // required
                    label: 'Sub - Counties',
                    minRows: 1,
                    maxRows: 1000,
                    labels: {
                        singular: 'Subcounty',
                        plural: 'Subcounties',
                    },
                    fields: [ // required
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Sub County Name',
                            required: true,
                        },
                        {
                            name: 'code',
                            type: 'text',
                            label: 'Code',
                            required: true,
                        }
                    ],
                },
            ],
        },
    ],
};
export default Location;