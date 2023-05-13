import { SavePayment } from "../mpesa/payment";



const Payments = {
    slug: 'payments',
    admin: {
        useAsTitle: 'MpesaReceiptNumber',
    },
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true
    },
    fields: [
        {
            name: 'userId',
            label: 'User ID',
            type: 'text',
            required: true,
            access: {
                update: () => false,
            },
        },
        {
            name: 'productId',
            label: 'Product Id',
            type: 'text',
            required: true,
            access: {
                update: () => false,
            },
        },
        {
            name: 'Amount',
            label: 'Amount Payed',
            type: 'number',
            required: true,
            access: {
                update: () => false,
            },
        },
        {
            name: 'MpesaReceiptNumber',
            label: 'Mpesa Confirmation Number',
            type: 'text',
            required: true,
            access: {
                update: () => false,
            },
        },
        {
            name: 'TransactionDate',
            label: 'Transaction Date',
            type: 'number',
            required: true,
            access: {
                update: () => false,
            },
        },
        {
            name: 'PhoneNumber',
            label: 'Phone Number',
            type: 'number',
            required: true,
            access: {
                update: () => false,
            },
        },
    ],
    hooks: {
        beforeValidate: [SavePayment]
    }
};

export default Payments;