export const resolvers = {
  Query: {
    getUsers: () => ([{
      id: 1,
      username: 'clayton',
      password: 'clayton',
      email: 'claytonphillipsdorsett@gmail.com',
      email_validated: false,
      created: 'new Date()'
    }])
  }
};
