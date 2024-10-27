import { User } from '../models/index.js'; // had to remove default from index
import { signToken, AuthenticationError } from '../services/auth.js';

const resolvers = {
    Query: {
        me: async () => {},
    },
    Mutation: {
        login: async () => {},
        addUser: async () => {},
        saveBook: async () => {},
        removeBook: async () => {},
    },
};

export default resolvers;