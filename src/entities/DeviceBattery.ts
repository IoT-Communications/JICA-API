import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('DEVICE_BATTERY')
export default class DeviceBattery extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column('varchar',{ length: 16,})
    deviceID!: String;

    @Column('int')
    batteryVoltage!: string;

    @Column('int')
    stepNum!: string;

    @Column('int')
    signalStrength!: string;

    @Column("datetime")
    timestamp!: string;
}
