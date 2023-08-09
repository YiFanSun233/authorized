type AuthorityFN = (currentAuthority?: string | string[]) => boolean | Promise<any>;

export type Authority = string | string[] | AuthorityFN | Promise<any>;

export type CurrentAuthority = string | string[]
