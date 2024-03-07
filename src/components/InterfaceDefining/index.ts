export interface HeaderValues {
    "Content-Type"?: string,
    "x-hasura-role"?: string,
    "x-hasura-admin-secret"?:string
    "x-hasura-user-id"?: string,
}

  
export interface OptionalValues {
    method: string,
    headers: HeaderValues,
    body: string,
}
  
export interface ApiStatus {
    initial: string
    inProgress: string
    success: string
    failure: string
}

export interface DataValues {
    id: string;
    transaction_name: string;
    type: string;
    category: string;
    amount: number;
    date: string;
    user_id: number;
    sum:number
  }

export interface ApiStatusAndData {
    status: string;
    data: DataValues[];
    errorMsg?: string;
}
  
export interface CrediteAndDebitList {
    debit?: number
    credit?: number
    type?: string
    date?: string
    sum?: number
}

export interface TransctionProps {
    id: number;
    type: string;
    transaction_name: string;
    date: string;
    category: string;
    amount: number;
    user_id: number;
}
  
export interface ProfileDetails {
    name?: string;
    email?: string;
    date_of_birth?: string;
    present_address?: string;
    permanent_address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    password?: string;
    userId?: number;
  }