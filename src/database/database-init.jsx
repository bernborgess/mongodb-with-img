import { DatabaseConnection } from './database-connection'

var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
    );
        this.InitDb()
    }
    InitDb() {
        var sql = [
            `DROP TABLE IF EXISTS animal;`,
            `DROP TABLE IF EXISTS gato;`,
            `DROP TABLE IF EXISTS cachorro;`,

            `create table if not exists animal (
            id integer primary key autoincrement,
            nome text,
         
            );`,
            `create table if not exists gato (
            id integer primary key autoincrement,
            nome text,
            animal_id int,
            foreign key (animal_id) references animal (id)
            );`,
             `create table if not exists cachorro (
            id integer primary key autoincrement,
            nome text,
            animal_id int,
            foreign key (animal_id) references animal (id)
            );`,
            
            `insert into gato(nome) values('preto');`,
            `insert into gato(nome) values('cinza');`,
            `insert into cachorro (nome) values('vira lata');`,
            `insert into cachorro (nome) values('salsicha');`
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}