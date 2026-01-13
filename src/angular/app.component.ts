import { Component, OnDestroy, OnInit } from "@angular/core";

const getGlobalCount = () => (window.store ? window.store.count : 0);
const getGlobalLanguage = () => (window.store ? window.store.language : "en");

@Component({
    selector: "app-root",
    template: `
        <section class="wrap">
            <div class="card">
                <div>
                    <h2>{{ copy.title }}</h2>
                    <p>{{ copy.subtitle }}</p>
                    <p class="muted">{{ copy.note }}</p>
                </div>
                <button type="button" class="btn" (click)="increment()">
                    {{ copy.action }}
                </button>
            </div>

            <div class="card card-secondary">
                <div>
                    <h3>{{ copy.switcher }}</h3>
                    <p class="muted">
                        {{ copy.selected }}: {{ activeLanguage.label }}
                    </p>
                </div>
                <div class="lang-row">
                    <button
                        *ngFor="let lang of languages"
                        type="button"
                        class="lang"
                        [class.active]="lang.code === activeLanguage.code"
                        (click)="setLanguage(lang.code)"
                    >
                        {{ lang.label }}
                    </button>
                </div>
            </div>
        </section>
    `,
    styles: [
        `
            .wrap {
                margin: 24px auto 0;
                padding: 0 16px;
                max-width: 680px;
                font-family: "Roboto", sans-serif;
            }

            .card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                padding: 16px 18px;
                border-radius: 14px;
                background: #ffffff;
                box-shadow: 0 10px 24px rgba(20, 23, 70, 0.12);
            }

            .card-secondary {
                margin-top: 14px;
                align-items: flex-start;
            }

            h2 {
                margin: 0 0 4px;
                font-size: 18px;
                color: #1f2a44;
            }

            h3 {
                margin: 0 0 6px;
                font-size: 16px;
                color: #1f2a44;
            }

            p {
                margin: 0;
                font-size: 14px;
                color: #334155;
            }

            .muted {
                color: #64748b;
            }

            .btn {
                border: none;
                border-radius: 999px;
                padding: 10px 16px;
                font-weight: 600;
                background: #3b5bff;
                color: #fff;
                cursor: pointer;
            }

            .lang-row {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                justify-content: flex-end;
            }

            .lang {
                border: 1px solid #cbd5f5;
                border-radius: 999px;
                padding: 8px 12px;
                font-size: 12px;
                background: #f8fafc;
                color: #1e293b;
                cursor: pointer;
            }

            .lang.active {
                border-color: #3b5bff;
                background: #3b5bff;
                color: #fff;
            }
        `,
    ],
})
export class AppComponent implements OnInit, OnDestroy {
    count = getGlobalCount();
    mirror = getGlobalCount();
    languages = [
        { code: "en", label: "English" },
        { code: "ru", label: "Русский" },
        { code: "es", label: "Español" },
        { code: "de", label: "Deutsch" },
        { code: "fr", label: "Français" },
    ];
    activeLanguage = this.languages[0];
    private unsubscribe?: () => void;

    ngOnInit() {
        if (!window.store) {
            return;
        }

        this.unsubscribe = window.store.subscribe(() => {
            this.count = window.store ? window.store.count : 0;
            this.mirror = this.count;
            const lang = getGlobalLanguage();
            this.activeLanguage =
                this.languages.find((item) => item.code === lang) ||
                this.languages[0];
        });

        const initialLang = getGlobalLanguage();
        this.activeLanguage =
            this.languages.find((item) => item.code === initialLang) ||
            this.languages[0];
    }

    ngOnDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    increment() {
        if (window.store) {
            window.store.increment();
            this.count = window.store.count;
            this.mirror = this.count;
        }
    }

    setLanguage(code: string) {
        const next = this.languages.find((lang) => lang.code === code);
        if (next) {
            this.activeLanguage = next;
            if (window.store) {
                window.store.setLanguage(next.code);
            }
        }
    }

    get copy() {
        const variants = {
            en: {
                title: "Angular Clicker",
                subtitle: `Store count: ${this.count}`,
                note: `Mirror value: ${this.mirror}`,
                action: "Click +1",
                switcher: "Language switcher",
                selected: "Selected",
            },
            ru: {
                title: "Angular Кликер",
                subtitle: `Счетчик в сторе: ${this.count}`,
                note: `Зеркальное значение: ${this.mirror}`,
                action: "Клик +1",
                switcher: "Переключение языка",
                selected: "Выбран",
            },
            es: {
                title: "Clicker Angular",
                subtitle: `Contador del store: ${this.count}`,
                note: `Valor espejo: ${this.mirror}`,
                action: "Clic +1",
                switcher: "Selector de idioma",
                selected: "Seleccionado",
            },
            de: {
                title: "Angular Klicker",
                subtitle: `Store-Zähler: ${this.count}`,
                note: `Spiegelwert: ${this.mirror}`,
                action: "Klick +1",
                switcher: "Sprachumschalter",
                selected: "Ausgewählt",
            },
            fr: {
                title: "Clicker Angular",
                subtitle: `Compteur du store : ${this.count}`,
                note: `Valeur miroir : ${this.mirror}`,
                action: "Clic +1",
                switcher: "Sélecteur de langue",
                selected: "Sélectionné",
            },
        };

        return (
            variants[this.activeLanguage.code as keyof typeof variants] ||
            variants.en
        );
    }
}
