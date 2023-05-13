import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
//import Users from './collections/Users';
import Media from './collections/Media';
import Services from './collections/services';
import WhyUs from './collections/whyus';
import Gallery from './collections/Gallery';
import Contact from './collections/contact';
import YourGoalsSteps from './globals/achievegoals';
import Company from './globals/company';
import Featured from './globals/Featured';
import Footer from './globals/footer';
import Projects from './collections/projects';
import Products from './collections/products';
import Users from './collections/Users';
import Location from './collections/locations';
import MpesaLogs from './collections/mpesalogs';
import Payments from './collections/payment';
import Delivery from './collections/delivery';
import Orders from './collections/orders';
import Reviews from './collections/review';
import Faqs from './collections/faqs';
import Icon from './components/favicon';
import Logo from './components/logo';
import Team from './collections/Team';


export default buildConfig({
  serverURL: process.env.SERVER_URL,
  cors: [
    "https://api.safaricom.com",
    "https://sandbox.safaricom.com",
    "https://olestonesbuilders.co.ke"
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Olestones Builders & Logistics',
      // favicon: '/assets/favicon.png',
      // ogImage: '/assets/logo.png',
    },
    components:{
      graphics: {
        Logo,
        Icon,
      },
    }

  },
  collections: [Categories, Tags, Posts, Products, Orders, Team, Payments, Reviews, Media, Services, WhyUs, Faqs, Projects, Gallery, Contact, Location, Delivery, MpesaLogs, Users],

  globals: [
    Featured,
    YourGoalsSteps,
    Company,
    Footer
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [

  ],
});
