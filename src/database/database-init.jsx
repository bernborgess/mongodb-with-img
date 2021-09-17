import {DatabaseConnection} from './database-connection';

var db = null;
export default class DatabaseInit {
  constructor() {
    db = DatabaseConnection.getConnection();
    db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () =>
      console.log('Foreign keys turned on')
    );
    this.InitDb();
  }
  InitDb() {
    var sql = [
      `drop table if exists paciente;`,
      `create table if not exists paciente (
            id integer primary key autoincrement,
            nome text,
            image text,         
      );`,
    ];

    db.transaction(
      (tx) => {
        for (var i = 0; i < sql.length; i++) {
          console.log('execute sql : ' + sql[i]);
          tx.executeSql(sql[i]);
        }
      },
      (error) => {
        console.log('error call back : ' + JSON.stringify(error));
        console.log(error);
      },
      () => {
        console.log('transaction complete call back ');
      }
    );
  }
}
