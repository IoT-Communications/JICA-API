import {
    BaseEntity,
    Column,
    Entity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    PrimaryColumn,
  } from 'typeorm';
  
  
  
  @Entity('DEVICE_GPS_LOCATION')
  export default class DeviceLocation extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: string;

    @Column('varchar',{ length: 16,})
    deviceID!: String;
  
    @Column('double')
    latitude!: string;
  
    @Column('double')
    longitude!: string;
  
    @Column('varchar',{ length: 15,})
    status!: string;
  
    @Column("datetime")
    timestamp!: string;
  }
  