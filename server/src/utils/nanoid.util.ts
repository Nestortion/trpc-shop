import { customAlphabet } from "nanoid";

const ALPHABET = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const nanoid = customAlphabet(ALPHABET, 21);
