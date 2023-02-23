
export interface GenerateEmail {
    titlePrompt: String,
    prompt: String,
    language: String,
    soft: String,
  }
export interface ObjectTextFree {
    titlePrompt: String,
    prompt: String,
    language: String,
    soft: String,
  }
export interface MakeArticle {
    prompt: String,
    language: String,
    soft: String,
    maxLength: number,
    keyWords: string[],
    generateSeoKeyWords: boolean,
    generateImages: boolean
  }
export interface ObjectTextSocial {
    prompt: String,
    maxLength: number,
    language: String,
    soft: String,
    hashtag: string[],
    maxResponses: number,
    countHashtag: number,
    automaticHastag: boolean
  }
  
  export interface ObjUser {
    userName: string,
    userEmail: String,
    userPassword: String,
    userToken?: String
  }
  