export interface Content {
    introduction:[
        title:string,
        content:string
    ],
    header:[
        home:string,
        about:string,
        projects:string,
        contact:string
    ],
    about:[
        title:string,
        resume:string,
        call:string
    ],
    projects:[
        resume:string,
        project:string,
        call:string,
        content:string,
        skills:string
    ],
    contact:[
        resume:string,
        name:string,
        email:string,
        message:string,
        submit:string
    ],
    footer:[
        social:string,
    ]
}

export interface Language {
    id: number;
    lang: string;
    content: Content
    
};
