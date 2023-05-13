const Company = {
    slug: 'company',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Admin'
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Company Name',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Company Description',
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Company Logo',
            relationTo: 'media', // required
            required: true,
        }
    ],
};
export default Company;