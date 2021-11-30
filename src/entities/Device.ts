import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn
} from 'typeorm';

@Entity('DEVICE')
export default class Device extends BaseEntity {

    @PrimaryColumn('varchar',{ length: 16})
    deviceID!: string;

    @Column('varchar',{ length: 16})
    name!: string;

    @Column('varchar',{ length: 15,})
    firmware!: string;

    @Column('varchar',{ length: 15,})
    type!: string;
}
