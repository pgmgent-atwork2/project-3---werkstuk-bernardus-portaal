/* eslint-disable prettier/prettier */
import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
name: 'Point',
tableName: 'Points',
columns: {
   id: {
   primary: true,
   type: 'int',
   generated: true,
   },
   point: {
   type: 'int',
   },
},

relations: {
   subjects: {
      target: 'Subject',
      type: 'many-to-one',
      joinColumn: {
      name: 'subject_id',
      },
      inverseSide: 'subject',
   },
},
});
