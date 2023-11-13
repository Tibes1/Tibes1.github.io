export interface Language {
    id: number;
    lang: string;
    content: [
        presentation: string,
        outro: string,
    ]
}