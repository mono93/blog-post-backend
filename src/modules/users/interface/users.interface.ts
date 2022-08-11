interface ISignup {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
}

interface ILogin {
    email: string;
    password: string;
}

export { ISignup, ILogin }