import generateOrderID from "../hooks/generateRandomId";

const Orders = {
    slug: 'orders',
    access: {
        create: () => true,
        read: () => true,
        update: () => false,
        delete: () => false
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'productname',
            type: 'text',
            label: 'Product Name',
            required: true,
        },
        {
            name: 'productcolor',
            type: 'text',
            label: 'Product Color',
            required: true,
        },
        {
            name: 'productsize',
            type: 'text',
            label: 'Product Size',
            required: true,
        },
        {
            name: 'productid',
            type: 'text',
            label: 'Product ID',
            required: true,
        },
        {
            name: 'productquantity',
            type: 'number',
            label: 'Product Quantity',
            required: true,
        },
        {
            name: 'shippingmethod',
            type: 'text',
            label: 'Shipping Method',
            required: true,
        },
        {
            name: 'totalamountpayed',
            type: 'number',
            label: 'Total Amount Paid',
            required: true,
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            required: true,
        },
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            required: true,
        },
        {
            name: 'county',
            type: 'text',
            label: 'County',
            required: true,
        },
        {
            name: 'subcounty',
            type: 'text',
            label: 'Subcounty',
            required: true,
        },
        {
            name: 'town',
            type: 'text',
            label: 'Town',
            required: true,
        },
        {
            name: 'center',
            type: 'text',
            label: 'Center',
            required: true,
        },
        {
            name: 'house',
            type: 'text',
            label: 'House',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
            label: 'Phone',
            required: true,
        },
        {
            name: 'clientid',
            type: 'text',
            label: 'Client ID',
            required: true,
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
        {
            name: 'ordernumber',
            type: 'text',
            label: 'Order Number',
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
                condition: (data) => Boolean(data?.ordernumber),
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
            ({ operation, data }) => {
                if (operation === 'create') {
                        data.ordernumber = generateOrderID();
                        return data;
                }
            },
        ],
    },
};
export default Orders;