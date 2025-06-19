export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone: number;
  website?: string;
  company?: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
  geo?: Geo;
}

export interface Geo {
  lat: number;
  lng: number;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
