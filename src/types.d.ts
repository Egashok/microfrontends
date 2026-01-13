interface Store {
    count: number;
    increment: () => void;
    language: string;
    setLanguage: (nextLanguage: string) => void;
    subscribe: (fn: () => void) => () => void;
}

interface Window {
    store?: Store;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}
