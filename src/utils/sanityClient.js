import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import axios from 'axios';

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

export const sanityPost = (mutations) => {
  return axios.post(
    SANITY_URL,
    { mutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${SANITY_AUTH_TOKEN}`,
      },
    }
  );
};

export const urlFor = (source) => {
  const builder = imageUrlBuilder(sanityClient);
  builder.image(source).url();
};
export default sanityClient;
