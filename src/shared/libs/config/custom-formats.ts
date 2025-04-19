import { Format } from 'convict';

export const customFormats: { [name: string]: Format } = {
  ipaddress: {
    validate: (value: unknown) => {
      if (typeof value !== 'string' || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
        throw new Error('must be a valid IP address');
      }
    },
    coerce: (value: unknown) => String(value),
  },
};
