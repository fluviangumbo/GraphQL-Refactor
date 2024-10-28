const typeDefs = `
type User {
    _id: String
    username: String
    email: String
    password: String
    savedBooks: Book[]
    bookCount: Number
}

type Book {
    bookId: String
    title: String
    authors: String[]
    description: String
    image: string
    link: string
}

input UserInput {
    username: String
    email: String
    password: String
}

input BookInput {
    bookId: String
    title: String
    authors: String[]
    description: String
    image: String
    link: String
}

type Auth { 
    token: String
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: String!): User
}
`;
// need to include virtals/getters? we have bookCount

export default typeDefs;