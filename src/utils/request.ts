import { envVariable } from '../envVariable';

type RequestFactoryCreateOptions = {
  baseUrl: string;
  tryTime?: number;
  timeout?: number;
  reqInterceptor?: (init: RequestInit) => RequestInit;
};

const baseRequest = async (
  input: RequestInfo | URL,
  init: RequestInit,
  config: { timeout?: number; tryTime: number },
): Promise<unknown> => {
  const controller = new AbortController();

  if (config.timeout) {
    setTimeout(() => {
      controller.abort();
    }, config.timeout);
  }

  const _req = async () =>
    fetch(input, { ...init, signal: controller.signal }).then((resp) => {
      if (!resp.ok) {
        throw new Error('request failed');
      }

      return resp.json();
    });

  if (config.tryTime === 1) {
    return _req();
  }

  try {
    return await _req();
  } catch (e) {
    return baseRequest(input, init, {
      ...config,
      tryTime: config.tryTime - 1,
    });
  }
};

const requestFactory = {
  create(options: RequestFactoryCreateOptions) {
    const { baseUrl, tryTime = 1, timeout, reqInterceptor = (init) => init } = options;

    const createPostLikeRequest = (method: 'POST' | 'PUT' | 'DELETE') => {
      async function postLikeRequest<T extends Record<string, unknown>>(
        path: string,
        params: Record<string, string | number> = {},
      ) {
        const _options = reqInterceptor({
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        return baseRequest(`${baseUrl}${path}`, _options, {
          tryTime,
          timeout,
        }) as Promise<T>;
      }

      return postLikeRequest;
    };

    const requestObj = {
      async get<T extends Record<string, unknown>>(
        path: string,
        params: Record<string, string | number> = {},
      ) {
        const paramsStr = new URLSearchParams(params as Record<string, string>);

        const _options = reqInterceptor({});

        return baseRequest(`${baseUrl}${path}${paramsStr}`, _options, {
          tryTime,
          timeout,
        }) as Promise<T>;
      },

      post: createPostLikeRequest('POST'),
      put: createPostLikeRequest('PUT'),
      delete: createPostLikeRequest('DELETE'),
    };

    return requestObj;
  },
};

const tryTimeEnvResolver = {
  ['development']: 5,
  ['production']: 1,
};

export const request = requestFactory.create({
  baseUrl: envVariable.NEXT_PUBLIC_BASE_URL,
  tryTime: tryTimeEnvResolver[envVariable.NODE_ENV],
  reqInterceptor(init) {
    const { headers, ...rest } = init;

    const token = localStorage.getItem('token') ?? '';
    return {
      headers: {
        ...headers,
        ['Authorization']: token,
      },
      ...rest,
    };
  },
});
