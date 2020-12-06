'use strict';

const { buildSchema } = require('graphql');

const schema = buildSchema(`
    scalar Upload

    type DummyFile {
        url: String
    }

    enum UserType {
        admin
        user
    }

    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String
        lastName: String
        isVerified: Boolean!
        bio: String
        userType: String!
        profileImageUrl: String
        token: String
    }

    type Plant {
        _id: ID!
        imageUrl: String!
        description: String
        likedByUsers: [ID]
        user: User
        likedByMe: Boolean
        createdAt: String
    }

    type UserProfile {
        user: User!
        plants: [Plant]
    }

    type Query {
        user(id: ID!): User
        login(username: String!, password: String!): User
        plants(start: Int, limit: Int): [Plant]
        plant(id: ID): Plant
        userProfile(username: String!): UserProfile
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!, firstName: String, lastName: String, bio: String): User
        updateUser(bio: String, firstName: String, lastName: String): User
        updateUserImage(file: Upload): User
        upload(file: Upload!, description: String): DummyFile
        addPlant(file: Upload!, description: String): Plant
        updatePlant(id: String, description: String): Plant
        deletePlant(id: String): Plant
        likePlant(id: String): Plant
    }
`);

module.exports = schema;
