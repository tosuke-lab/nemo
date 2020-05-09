import type {Credential} from '@models/type';

export type AuthState = {
  defaultId?: string;
  credentials: Credential[];
};
