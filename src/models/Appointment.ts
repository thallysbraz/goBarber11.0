/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import User from "./User";

// KISS - Keep It Simples & Stupid

@Entity("appointments")
class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "provider_id" })
    provider: User;

    @Column("time with time zone")
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    update_at: Date;
}

export default Appointment;
