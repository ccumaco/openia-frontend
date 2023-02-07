
export interface ObjectTextFree {
    titlePrompt: String,
    prompt: String,
    language: String,
    soft: String,
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