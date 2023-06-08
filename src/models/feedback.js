/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Feedback',
tableName: 'Feedback',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   text: {
   type: 'varchar',
   nullable: false,
   },
},

relations: {
   users: {
      target: 'User',
      type: 'many-to-many',
      joinTable: {
         name: 'user_feedback'
      },
      cascade: true,
   },
   subjects: {
      target: 'Subject',
      type: 'many-to-one',
      joinColumn: {
      name: 'subject_id',
      },
      inverseSide: 'subject',
      nullable: true,
   },
   teacher: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'teacher_id'
      },
      cascade: true,
   },
   student: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
         name: 'student_id'
      },
      cascade: true,
   },
},
});
