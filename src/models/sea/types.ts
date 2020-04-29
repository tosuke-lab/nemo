import type {Dayjs} from 'dayjs';

export type Others = string & {__tag__: 'others'};

export type SeaCredential = {
  readonly id: string;
  readonly provider: 'sea';
  readonly host: string;
  readonly accessToken: string;
};

export type SeaFileVariant = {
  readonly provider: 'sea';
  readonly host: string;
  readonly id: number;
  readonly score: number;
  readonly extension: string;
  readonly type: 'thumbnail' | 'image' | 'video' | Others;
  readonly size: number;
  readonly url: string;
  readonly mime: string;
};

export type SeaFile = {
  readonly provider: 'sea';
  readonly host: string;
  readonly id: number;
  readonly type: 'image' | 'video' | Others;
  readonly name: string;
  readonly variants: readonly SeaFileVariant[];
};

export type SeaApp = {
  readonly provider: 'sea';
  readonly host: string;
  readonly id: number;
  readonly name: string;
  readonly isBot: boolean;
};

export type SeaUser = {
  readonly provider: 'sea';
  readonly host: string;
  readonly id: number;
  readonly screenName: string;
  readonly name: string;
  readonly postsCount: number;
  readonly createdAt: Dayjs;
  readonly updatedAt: Dayjs;
  readonly avatarFile?: SeaFile;
};

export type SeaPost = {
  readonly provider: 'sea';
  readonly host: string;
  readonly id: number;
  readonly text: string;
  readonly user: SeaUser;
  readonly createdAt: Dayjs;
  readonly files: readonly SeaFile[];
  readonly app: SeaApp;
};
