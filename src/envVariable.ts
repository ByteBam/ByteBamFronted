type EnvVariable = {
  NODE_ENV?: 'development' | 'production';
  NEXT_PUBLIC_NODE_ENV: 'development' | 'production';
  NEXT_PUBLIC_BASE_URL: string;
};

export const envVariable = {
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
} as Readonly<EnvVariable>;
