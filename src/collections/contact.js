const Contact = {
    slug: 'contact',
    access: {
        create: () => true,
        read: () => true,
        update: () => false,
        delete: () => false
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'name', // required
            type: 'text', // required
            label: 'Name',
            required: true,
        },
        {
            name: 'email', // required
            type: 'text', // required
            label: 'Email',
            required: true,
        },
        {
            name: 'message', // required
            type: 'textarea', // required
            label: 'Message',
            required: true,
        }
    ],
};
export default Contact;