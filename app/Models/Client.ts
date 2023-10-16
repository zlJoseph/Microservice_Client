import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

function convertDateFormat(value: Date){
  const año = value.getUTCFullYear();
  const mes = (value.getUTCMonth() + 1).toString().padStart(2, '0');
  const dia = value.getUTCDate().toString().padStart(2, '0');
  return `${año}-${mes}-${dia}`
}

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public mothers_surname: string

  @computed()
  public get full_name(){
    return `${this.name} ${this.surname} ${this.mothers_surname}`
  }

  @column()
  public age: number

  @column({
    serialize: (value: Date) =>{
      return convertDateFormat(value)
    }
  })
  public birthdate: Date

  @computed()
  public get probable_death_date(){
    const death_date = new Date(this.birthdate);
    death_date.setFullYear(death_date.getFullYear()+76)
    death_date.setMonth(death_date.getMonth()+6)
    return convertDateFormat(death_date)
  } 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static setAge(client: Client){
    client.age = Math.floor(( (new Date()).getTime() - (client.birthdate.getTime())) / (1000 * 60 * 60 * 24 * 365.25))
  }
}
