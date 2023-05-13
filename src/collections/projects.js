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
            label: 'Project Description',
            required: true,
        },
        {
            name: 'image', // required
            type: 'array', // required
            label: 'Image Grid',
            minRows: 2,
            maxRows: 10,
            labels: {
                singular: 'Image',
                plural: 'Images',
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
        }
    ],
};
export default Projects;