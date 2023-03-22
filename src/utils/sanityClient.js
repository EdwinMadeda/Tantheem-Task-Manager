import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = 'comp0x9y';
export const dataset = 'production';
export const SANITY_URL = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`;
export const SANITY_IMG_UPLOAD_URL = `https://${projectId}.api.sanity.io/v1/assets/images/${dataset}`;
export const SANITY_AUTH_TOKEN = process.env.REACT_APP_SANITY_AUTH_TOKEN;

const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-03-19',
});

const build = imageUrlBuilder(sanityClient);
export const urlFor = (source) => build.image(source);
export default sanityClient;
