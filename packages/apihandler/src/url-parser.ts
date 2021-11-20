export interface Path {
  basename: string;
  extension?: string;
}

export function parsePathParam(pathParam: string): Path {
  const match = pathParam.match(/([\w%]+)(\.[\w]+)?/);

  if (!match) {
    throw new Error(`invalid path: ${pathParam}`);
  }

  const basename = decodeURIComponent(match[1]);
  const extension = match[2];

  if (extension) {
    return {
      basename,
      extension
    };
  }

  return {
    basename
  };
}
