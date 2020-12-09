import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName : string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        defaultValue: true,
        allowNull: false,
    })
    IsResourceOwner: string;
}
