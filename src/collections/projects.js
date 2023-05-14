import formatSlug from "../utils/formatSlug";

const Projects = {
    slug: 'projects',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Project title',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Overall Project Description',
            required: true,
        },
        {
            name: 'descriptor', // required
            type: 'array', // required
            label: 'Project Images',
            minRows: 2,
            maxRows: 10,
            labels: {
                singular: 'Project Image',
                plural: 'Project Images',
            },
            fields: [ // required
                {
                    name: 'image', // required
                    type: 'upload', // required
                    label: 'Project Image',
                    relationTo: 'media', // required
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
        }
    ],
};
export default Projects;