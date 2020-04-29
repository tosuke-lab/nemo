import $, {Transformer} from 'transform-ts';
import {int, map, iso8601} from '@utils/transformers';
import type {
  Others,
  SeaFileVariant,
  SeaFile,
  SeaApp,
  SeaUser,
  SeaPost,
} from './types';

const others: Transformer<string, Others> = $.string as any;

const seaFileVariant = (host: string): Transformer<unknown, SeaFileVariant> =>
  $.obj({
    id: int,
    score: $.number,
    extension: $.string,
    type: $.either($.literal('thumbnail', 'image', 'video'), others),
    size: $.number,
    url: $.string,
    mime: $.string,
  }).compose(
    map((x) => ({
      ...x,
      provider: 'sea',
      host,
    })),
  );

export const seaFile = (host: string): Transformer<unknown, SeaFile> =>
  $.obj({
    id: int,
    type: $.either($.literal('image', 'video'), others),
    name: $.string,
    variants: $.array(seaFileVariant(host)),
  }).compose(map((x) => ({...x, provider: 'sea', host})));

const seaApp = (host: string): Transformer<unknown, SeaApp> =>
  $.obj({
    id: int,
    name: $.string,
    isBot: $.withDefault($.boolean, false),
  }).compose(
    map((x) => ({
      ...x,
      provider: 'sea',
      host,
    })),
  );

export const seaUser = (host: string): Transformer<unknown, SeaUser> =>
  $.obj({
    id: int,
    screenName: $.string,
    name: $.string,
    postsCount: int,
    createdAt: iso8601,
    updatedAt: iso8601,
    avatarFile: $.nullable($.optional(seaFile(host))).compose(
      map((x) => x ?? undefined),
    ),
  }).compose(map((x) => ({...x, provider: 'sea', host})));

export const seaPost = (host: string): Transformer<unknown, SeaPost> =>
  $.obj({
    id: int,
    text: $.string,
    user: seaUser(host),
    createdAt: iso8601,
    files: $.array(seaFile(host)),
    application: seaApp(host),
  }).compose(map((x) => ({...x, app: x.application, provider: 'sea', host})));
