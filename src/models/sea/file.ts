import type {SeaFile} from './types';

export const thumbnailVariants = (file: SeaFile) =>
  file.variants.filter((v) => v.type === 'thumbnail');

export const imageVariants = (file: SeaFile) =>
  file.variants.filter((v) => v.type === 'image');

export const videoVariants = (file: SeaFile) =>
  file.variants.filter((v) => v.type === 'video');
