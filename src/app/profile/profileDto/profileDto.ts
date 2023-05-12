export class ProfileDto {
  id?: number;
  first_name?: string;
  last_name?: string;
  age?: number;
  gender?: string;
  avatar?: string;
  balance?: number

  constructor(id: number, first_name: string, last_name: string, age: number, gender: string, avatar: string, balance: number) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.gender = gender;
    this.avatar = avatar;
    this.balance = balance;
  }
}
