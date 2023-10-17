import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {    
    await Client.createMany([
      {
        name: 'José Omar',
        surname: 'Vegas',
        mothers_surname: 'Carrillo',
        birthdate: new Date('1999-01-02'.replace(/-/g, '/'))
      },
      {
        name: 'Pedro',
        surname: 'Vegas',
        mothers_surname: 'Carrillo',
        birthdate: new Date('1994-03-30'.replace(/-/g, '/'))
      },
      {
        name: 'Luz',
        surname: 'Vegas',
        mothers_surname: 'Carrillo',
        birthdate: new Date('1993-01-21'.replace(/-/g, '/'))
      },
      {
        name: 'Juan Carlos',
        surname: 'Yupanqui',
        mothers_surname: 'Sandoval',
        birthdate: new Date('2000-09-14'.replace(/-/g, '/'))
      },
      {
        name: 'Rosa Luz',
        surname: 'Carrillo',
        mothers_surname: 'Castillo',
        birthdate: new Date('1972-08-20'.replace(/-/g, '/'))
      },
      {
        name: 'Lennin',
        surname: 'Fabricio',
        mothers_surname: 'Campos',
        birthdate: new Date('1999-12-24'.replace(/-/g, '/'))
      }
    ])

    const clients = await Client.all();
    const ages = clients.map(client => client.age);
    const sum_age = ages.reduce((total, numero) => total + numero, 0);
    const sum_age_squared = ages.reduce((total, numero) => total + numero ** 2, 0);

    const analytic = await Database.from('analytics').select('*').where('id', 1).first()
    if(analytic){
      await Database
        .from('analytics')
        .where('id', analytic.id)
        .update({ count: ages.length, sum_age: sum_age, sum_age_squared: sum_age_squared })
    }else{
      await Database
        .table('analytics')
        .insert({ id: 1, count: ages.length, sum_age: sum_age, sum_age_squared: sum_age_squared })
    }
  }
}
