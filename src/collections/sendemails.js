import payload from "payload";

const SendEmails = {
    slug: 'sendEmails',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'subject',
    },
    fields: [
        {
            name: 'from', // required
            type: 'text', // required
            label: 'Senders or Organizations Name',
            required: true,
        },
        {
            name: 'subject', // required
            type: 'text', // required
            label: 'Email Subject',
            required: true,
        },
        {
            name: 'emailfrom', // required
            type: 'relationship', // required
            label: 'Senders Email',
            relationTo: 'olestonesEmails', // required
            hasMany: false,
            required: true,
        },
        {
            name: 'emailto', // required
            type: 'email', // required
            label: 'Receivers Email',
            required: true,
        },
        {
            name: 'emailbody', // required
            type: 'textarea', // required
            label: 'Email Body',
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
        afterChange: [
            async ({
                doc,
                req,
                previousDoc,
                operation,
            }) => {


                const emailfrom = await payload.findByID({
                    collection: "olestonesEmails", // required
                    id: req.body.emailfrom, // required
                })

                var message = {
                    from: {
                        name: req.body.from,
                        address: emailfrom.email,
                    },
                    to: req.body.emailto,
                    subject: req.body.subject,
                    html: `<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <title>Email Template</title>
                            <style>
                                /* Reset styles */
                                body, p, h1, h2, h3, h4, h5, h6, ul, ol, li {
                                    margin: 0;
                                    padding: 0;
                                }
                                
                                body {
                                    background-color: #f5f5f5;
                                    font-family: Arial, sans-serif;
                                    font-size: 16px;
                                    line-height: 1.5;
                                    color: #333333;
                                }
                                
                                /* Main content */
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 5px;
                                    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
                                }
                                
                                h1 {
                                    font-size: 24px;
                                    font-weight: bold;
                                    margin-bottom: 20px;
                                }
                                
                                p {
                                    margin-bottom: 20px;
                                }
                                
                                a {
                                    color: #ffffff;
                                    text-decoration: none;
                                }
                                
                                /* Button styles */
                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    background-color: #0066cc;
                                    color: #ffffff;
                                    border-radius: 5px;
                                    text-align: center;
                                    text-decoration: none;
                                }
                                
                                .button:hover {
                                    background-color: #003366;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>${req.body.subject}</h1>
                                <p>Dear ${req.body.emailto},</p>
                                <p>${req.body.emailbody}</p>
                                <a class="button" href="https://olestonesbuilders.co.ke">Visit our website</a>
                            </div>
                        </body>
                        </html>
`
                };

                await payload.sendEmail(message)

                return doc;
            }
        ]
    },
};
export default SendEmails;