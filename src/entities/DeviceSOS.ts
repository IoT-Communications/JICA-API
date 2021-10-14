import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('DEVICE_HEALTH')
export default class DeviceHealth extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column('varchar',{ length: 16,})
    deviceID!: String;

    @Column('int')
    bpHigh!: string;

    @Column('int')
    bpLow!: string;

    @Column('int')
    heartRate!: string;

    @Column("datetime")
    timestamp!: string;
}