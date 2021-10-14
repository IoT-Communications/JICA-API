import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('DEVICE_TEMPERATURE')
export default class DeviceTemperature extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column('varchar',{ length: 16,})
    deviceID!: String;

    @Column('double')
    skinTemp!: string;

    @Column('double')
    bodyTemp!: string;

    @Column("datetime")
    timestamp!: string;
}
