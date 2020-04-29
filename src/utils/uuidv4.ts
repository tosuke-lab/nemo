import * as uuid from 'uuid';
import * as Random from 'expo-random';

export const uuidv4 = async () => {
  const random = await Random.getRandomBytesAsync(16);
  return uuid.v4({random});
};
