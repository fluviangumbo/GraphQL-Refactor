import User from '../models/index.js'; // had to remove default from index
import { signToken, AuthenticationError } from '../services/auth.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Could not validate user.');
        },
    },
    Mutation: {
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User email not found.');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Could not validate user.');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, {
                    $addToSet: { savedBooks: { ...input } }
                }, { new: true });
            }
            throw new AuthenticationError('Error adding book.');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, {
                    $pull: { savedBooks: { bookId } }
                }, { new: true });
            }
            throw new AuthenticationError('Error removing book.');
        },
    },
};
export default resolvers;
