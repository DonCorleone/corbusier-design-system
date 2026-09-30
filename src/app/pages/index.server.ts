import { PageServerLoad } from '@analogjs/router';

export const load = async ({ fetch }: PageServerLoad) => {
  const data = (await fetch('/api/v1/hello')) as { message: string };

  return {
    message: data.message,
  };
};
