import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
export const UsersCollection = new Mongo.Collection('usuario');