
export interface GenerateEmail {
    titlePrompt: string;
    prompt: string;
    language: string;
    soft: string;
  }

export interface freeStyleWithContext{
  askUser: defineMessage
  context: Array<defineMessage>
}
export interface User {
  email: null | string,
  uid: string,
  displayName: string | null,
  photoURL?: string | null,
};
export type UserInterface = User | null;

export interface defineMessage {
  role: string;
  content: string;
}

export interface ObjectTextFree {
    prompt: string;
    soft: string;
    context?: Array<String>
}
export interface MakeArticle {
    prompt: string;
    language: string;
    soft: string;
    maxLength: number;
    keyWords: string[];
    generateSeoKeyWords: boolean;
    generateImages?: boolean;
  }
export interface MakeResume {
    prompt: string;
    language: string;
    soft: string;
    maxLength: number;
    whatToDo: string;
  }
export interface ObjectTextSocial {
    prompt: string;
    maxLength: number;
    language: string;
    soft: string;
    hashtag: string[];
    maxResponses: number;
    countHashtag: number;
    automaticHastag: boolean;
  }
  
  export interface ObjUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    userToken?: string;
  }
  