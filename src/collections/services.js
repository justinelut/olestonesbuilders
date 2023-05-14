import formatSlug from "../utils/formatSlug";

const Services = {
    slug: 'services',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title', // required
            type: 'text', // required
            label: 'Service title',
            required: true,
        },
        {
            name: 'description', // required
            type: 'textarea', // required
            label: 'Service Description',
            required: true,
        },
        {
            name: 'descriptor', // required
            type: 'array', // required
            label: 'Sub Section',
            minRows: 2,
            maxRows: 10,
            labels: {
                singular: 'Sub Section',
                plural: 'Sub Sections',
            },
            fields: [ // required
                {
                    name: 'image', // required
                    type: 'upload', // required
                    label: 'Sub Section Image',
                    relationTo: 'media', // required
                    required: true,
                },
                {
                    name: 'description', // required
                    type: 'textarea', // required
                    label: 'Service Description',
                    required: true,
                },
            ],
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
export default Services;