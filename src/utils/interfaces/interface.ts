export interface INewUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  message: string;
  status: number;
  data: null | object | object[] | string;
  error: null | string;
}

export interface ChatMessage {
  user_message: string;
  assistant_message: string;
}

export interface IFact {
  user_id?: string;
  type: string;
  item: string;
  category: string;
}
