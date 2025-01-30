export class User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  created: string;
  updated: string;
  verified: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname
    this.avatar = data.avatar;
    this.created = data.created;
    this.updated = data.updated;
    this.verified = data.verified;
  }

  static fromJSON(json: any): User {
    return new User(json);
  }
}

export class Response {
  id: string;
  created: string;
  auth: string;
  execTime: number;
  method: string;
  referer: string;
  remoteIP: string;
  status: number;
  type: string;
  url: string;
  userAgent: string;
  userIP: string;

  constructor(data: any) {
    this.id = data.id;
    this.created = data.created;
    this.auth = data.data.auth;
    this.execTime = data.data.execTime;
    this.method = data.data.method;
    this.referer = data.data.referer;
    this.remoteIP = data.data.remoteIP;
    this.status = data.data.status;
    this.type = data.data.type;
    this.url = data.data.url;
    this.userAgent = data.data.userAgent;
    this.userIP = data.data.userIP;
  }

  static fromJSON(json: any): Response {
    return new Response(json);
  }
}
