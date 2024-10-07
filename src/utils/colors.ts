const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const BLACK = '\x1b[30m';

export const red = (text: string): string => `${BOLD}${RED}${text}${RESET}`;
export const magenta = (text: string): string =>
  `${BOLD}${MAGENTA}${text}${RESET}`;
export const blue = (text: string): string => `${BOLD}${BLUE}${text}${RESET}`;

export const yellow = (text: string): string =>
  `${BOLD}${YELLOW}${text}${RESET}`;
export const green = (text: string): string => `${BOLD}${GREEN}${text}${RESET}`;
export const cyan = (text: string): string => `${BOLD}${CYAN}${text}${RESET}`;

export const white = (text: string): string => `${BOLD}${WHITE}${text}${RESET}`;
export const black = (text: string): string => `${BOLD}${BLACK}${text}${RESET}`;

export const cells = {
  current: magenta('+'),
  path: red('*'),
  visited: blue('0'),
};
