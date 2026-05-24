export interface INewUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  message: string;
  status: number;
  data: null | object | object[];
  error: null | string;
}

export interface ChatMessage {
  user_message: string;
  assistant_message: string;
}
