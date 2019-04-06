import ApolloClient from "apollo-boost";
import gpl from "graphql-tag";

export const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: "bearer 16f9e2995a66e23ed83ef48c23f09c5aa368eb17"
  }
});

export const getGithubProfile = profile =>
  apolloClient
    .query({
      query: gpl`{
      user(login: "${profile}") {
        name
        bioHTML
        avatarUrl
        companyHTML
        websiteUrl
      }
    }`
    })
    .then(({ data: { user: author } }) => {
      return author;
    });
