const Featured = {
    slug: 'featured',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Admin'
    },
    fields: [
        {
            name: 'title1',
            type: 'text',
            label: 'Title 1',
            required: true,
        },
        {
            name: 'title2',
            type: 'text',
            label: 'Title 2',
            required: true,
        },
        {
            name: 'image', // required
            type: 'upload', // required
            label: 'Featured Image',
            relationTo: 'media', // required
            required: true,
        }
    ],
};
export default Featured;