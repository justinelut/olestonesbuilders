import { processPayment } from "../mpesa/payment";

const MpesaLogs = {
    slug: 'mpesalogs',
    admin: {
        useAsTitle: 'paymentstatus',
    },
    access: {
        create: () => true,
        read: () => false,
        update: () => false,
        delete: () => false,
    },

    fields: [
        {
            name: 'phonenumber',
            label: 'Phone Number',
            type: 'number',
            required: true,
        },
        {
            name: 'paymentstatus',
            label: 'Payment Status',
            type: 'text',
            required: true,
        },
    ],

    hooks: {
        beforeValidate: [processPayment],
    }
};

export default MpesaLogs;