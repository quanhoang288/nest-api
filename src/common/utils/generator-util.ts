import { v4 as uuid } from 'uuid';

export function generateRandomString(): string {
  return uuid();
}
