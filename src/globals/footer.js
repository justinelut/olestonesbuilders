import formatSlug from "../utils/formatSlug";

const Footer = {
    slug: 'footer',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Admin'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Main Title',
            required: true,
        },
        {
            name: 'links', // required
            type: 'array', // required
            label: 'Footer',
            minRows: 1,
            maxRows: 4,
            labels: {
                singular: 'Footer',
                plural: 'Footer',
            },
            fields: [ // required
                {
                    name: 'title',
                    type: 'text',
                    label: 'Link Title',
                    required: true,
                },
                {
                    name: 'links', // required
                    type: 'array', // required
                    label: 'Footer Links',
                    minRows: 1,
                    maxRows: 4,
                    labels: {
                        singular: 'Footer Link',
                        plural: 'Footer Links',
                    },
                    fields: [ // required
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Link Title',
                            required: true,
                        },
                        {
                            name: 'slug',
                            type: 'text',
                            label: 'Links',
                            admin: {
                                position: 'sidebar',
                            },
                            hooks: {
                                beforeValidate: [
                                    formatSlug("slug")
                                ]
                            },
                        }
                    ],
                },
            ],
        },
    ],
};
export default Footer;