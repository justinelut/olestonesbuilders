import formatSlug from "../utils/formatSlug";
import data from './counties.json'


function extractCountiesAndSubcounties(data) {
    const counties = data.counties.map((countryData) => {
        const { county, code } = countryData;
        return {
            label: county,
            value: `${county}`,
        };
    });

    const subcounties = data.counties.flatMap((countryData) => {
        const { county, subcounties } = countryData;
        return subcounties.map((subcounty) => {
            const { name, code } = subcounty;
            return {
                label: `${county} - ${name}`,
                value: `${county}_${name}`,
            };
        });
    });

    return { subcounties, counties };
}

const { subcounties, counties } = extractCountiesAndSubcounties(data);

const Products = {
    slug: 'products',
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title', // required
            type: 'text', // required
            label: 'Product Title',
            required: true,
        },
        {
            name: 'price', // required
            type: 'number', // required
            label: 'Product Price',
            required: true,
        },
        {
            name: 'description', // required
            type: 'textarea', // required
            label: 'Product Description',
            required: true,
        },
        {
            name: 'county', // required
            type: 'select', // required
            label: 'County',
            required: true,
            options: counties,
            hasMany: true,
        },
        {
            name: 'subcounties', // required
            type: 'select', // required
            label: 'Subcounties',
            required: true,
            options: subcounties,
            hasMany: true,
        },
        {
            name: 'quantity', // required
            type: 'number', // required
            label: 'Product Quantity',
            required: true,
        },
        {
            name: 'colors', // required
            type: 'array', // required
            label: 'Product Colors',
            minRows: 0,
            maxRows: 3,
            labels: {
                singular: 'Product Color',
                plural: 'Product Colors',
            },
            fields: [ // required
                {
                    name: 'color', // required
                    type: 'text', // required
                    label: 'Product Color',
                },
            ],
        },
        {
            name: 'sizes', // required
            type: 'array', // required
            label: 'Product Sizes',
            minRows: 0,
            maxRows: 3,
            labels: {
                singular: 'Product Size',
                plural: 'Product Sizes',
            },
            fields: [ // required
                {
                    name: 'size', // required
                    type: 'text', // required
                    label: 'Product Size',
                },
            ],
        },
        {
            name: 'images', // required
            type: 'array', // required
            label: 'Product Images',
            minRows: 2,
            maxRows: 5,
            labels: {
                singular: 'Product Image',
                plural: 'Product Images',
            },
            fields: [ // required
                {
                    name: 'image', // required
                    type: 'upload', // required
                    label: 'Product Image',
                    relationTo: 'media', // required
                    required: true,
                },
            ],
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
export default Products;