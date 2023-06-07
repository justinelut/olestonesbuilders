import { sendmail } from "../hooks/sendmail";

const InvoiceMail = {
    slug: 'invoicemail',
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
        beforeValidate: [sendmail],
    }
};

export default InvoiceMail;