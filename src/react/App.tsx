import React from "react";
import styles from "./App.module.scss";

const FLAGS = [
    { code: "en", flag: "🇺🇸" },
    { code: "ru", flag: "🇷🇺" },
    { code: "es", flag: "🇪🇸" },
    { code: "de", flag: "🇩🇪" },
    { code: "fr", flag: "🇫🇷" },
];
const DEFAULT_LANGUAGE = "en";

const getStore = () =>
    typeof window !== "undefined" ? window.store : undefined;

const getSnapshot = () => {
    const store = getStore();
    return {
        count: store?.count ?? 0,
        language: store?.language ?? DEFAULT_LANGUAGE,
    };
};

const App: React.FC = () => {
    const [count, setCount] = React.useState(() => getSnapshot().count);
    const [mirror, setMirror] = React.useState(() => getSnapshot().count);
    const [language, setLanguage] = React.useState(
        () => getSnapshot().language
    );

    React.useEffect(() => {
        const store = getStore();
        if (!store) {
            return;
        }

        const unsubscribe = store.subscribe(() => {
            const nextStore = getStore();
            const nextCount = nextStore?.count ?? 0;
            setCount(nextCount);
            setMirror(nextCount);
            setLanguage(nextStore?.language ?? DEFAULT_LANGUAGE);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const increment = () => {
        const store = getStore();
        if (store) {
            store.increment();
            setCount(store.count);
            setMirror(store.count);
        }
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.profile}>
                    <h2 className={styles.title}>React Profile (TSX)</h2>
                    <p className={styles.text}>Name: Liza Morozova</p>
                    <p className={styles.text}>Role: Product Designer</p>
                    <p className={`${styles.text} ${styles.muted}`}>
                        Shared store clicks: {count} / mirror: {mirror}
                    </p>

                    <p className={`${styles.text} ${styles.muted}`}>
                        Active language flag:{" "}
                        {FLAGS.find((item) => item.code === language)?.flag ||
                            "🌍"}
                    </p>
                </div>
                <button
                    type="button"
                    className={styles.btn}
                    onClick={increment}
                >
                    Click +1
                </button>
            </div>
        </section>
    );
};

export default App;
