/* eslint-disable prettier/prettier */
import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    firstname: {
      type: 'varchar',
      nullable: true,
    },
    lastname: {
      type: 'varchar',
      nullable: true,
    },
    username: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    age: {
      type: 'int',
      nullable: true,
    },
    phone: {
      type: 'int',
      nullable: true,
    },
    address: {
      type: 'varchar',
      nullable: true,
    },
    country: {
      type: 'varchar',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    gender: {
      type: 'varchar',
      nullable: true,
    },
    level: {
      type: 'varchar',
      nullable: true,

    },
  },
  relations: {
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: {
        name: 'role_id',
      },
      inverseSide: 'user',
    },
    class: {
      target: 'Class',
      type: 'many-to-one',
      joinColumn: {
        name: 'class_id',
      },
      inverseSide: 'user',
    },
    subjects: {
      target: 'Subject',
      type: 'many-to-many',
      joinTable: {
        name: 'subjects_users'
      }, 
      cascade: true,
    },
    feedbacks: {
      target: 'Feedback',
      type: 'many-to-many',
      joinTable: {
        name: 'user_feedback'
      },
      cascade: true,
    },
    points: {
        target: 'Points',
        type: 'many-to-many',
        joinTable: {
        name: 'point_id',
        },
        inverseSide: 'point',
    },
  },
});

