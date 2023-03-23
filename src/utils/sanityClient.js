import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = 'j8emq587';
export const dataset = 'production';
export const SANITY_URL = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`;
export const SANITY_IMG_UPLOAD_URL = `https://${projectId}.api.sanity.io/v1/assets/images/${dataset}`;
export const SANITY_AUTH_TOKEN = process.env.REACT_APP_SANITY_AUTH_TOKEN;

const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-03-22',
  token: SANITY_AUTH_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source).url();
export default sanityClient;
