import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('DEVICE_ALARM')
export default class DeviceAlarm extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column('varchar',{ length: 16,})
    deviceID!: String;

    @Column('varchar',{ length: 50,})
    state!: string;

    @Column("datetime")
    timestamp!: string;
}