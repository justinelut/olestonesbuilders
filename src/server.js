import express from 'express';
import payload from 'payload';
import path from 'path'

require('dotenv').config();
const app = express();
app.use('/media', express.static(path.resolve(__dirname, '../media')));
app.use(/^\/(?!api).*/, express.static(path.resolve(__dirname, './frontend')));


const start = async () => {
  // Initialize Payload
 

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    email: {
      transportOptions: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_LOGIN_USERNAME,
          pass: process.env.EMAIL_LOGIN_PASSWORD
        },
        port: 587,
        secure: false, // use TLS
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      },
      fromName: process.env.EMAIL_SENDER,
      fromAddress: process.env.SENDER_EMAIL
    },
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here
  app.use(express.json())
  

  app.listen(process.env.PORT);
}

start()
