export class User {
    id?: string;
    name?: string;
    password?: string;
    email: string;  // Email is required and will be initialized in the constructor
    phone?: string;
    token?: string;
    isAdmin?: true;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    country?: string;

    // Constructor to initialize email
    constructor(email: string) {
        this.email = email;
    }
}