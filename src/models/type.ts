import type {SeaPost, SeaUser, SeaCredential} from './sea';

export const providers = ['sea'] as const;
export type Providers = typeof providers[number];

export type Credential = SeaCredential;
export type Post = SeaPost;
export type User = SeaUser;
