import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import CreateClientValidator from 'App/Validators/CreateClientValidator';
import Event from '@ioc:Adonis/Core/Event'
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import { clientNotFound, createSuccess, error500, validateJustNumber } from 'Config/display';

export default class ClientsController {

  /**
   * Listar clientes.
   * 
   * @param ctx - El contexto HTTP.
   * @returns Una promesa que representa una lista de clientes o un error correspondiente.
   */
  public async index({ request, response, logger }: HttpContextContract) {
    try{
      const page = request.input('page',1)
      const regex = /^\d+$/;
      if (!regex.test(page)) {
        logger.info({ message: validateJustNumber('page'), ...request.qs() }, 'Get ClientBy');
        return response.status(400).send({ message: validateJustNumber('page') });
      }
      const limit = 10
      const clients = await Client.query().paginate(page,limit)
      response.ok(clients.serialize({fields: { omit: ['name','surname','mothers_surname','probable_death_date','created_at','updated_at'] }}))
    }catch(error){
      logger.error({ err: error }, 'Get Clients');
      response.status(500).send({ message: error500 })
    }
  }

  /**
   * Crear cliente.
   * 
   * @param ctx - El contexto HTTP.
   * @returns Una promesa que representa la creación del cliente o un error correspondiente.
   */
  public async store({ response, request, logger }: HttpContextContract) {
    try{
      const clientInput = await request.validate(CreateClientValidator)
      console.log(clientInput.birthdate);
      
      const client = await Client.create({
        name: clientInput.name, 
        surname: clientInput.surname, 
        mothers_surname: clientInput.mothers_surname, 
        birthdate: clientInput.birthdate.toJSDate()
      })
      Event.emit('new:client', { age: client.age, name: client.name, surname: client.surname, mothers_surname: client.mothers_surname })
      response.created({msg: createSuccess, data: client.serialize({fields: { omit: ['id','created_at','updated_at'] }})})
    }catch(error){
      logger.error({ err: error }, 'Create Client');
      if (error instanceof ValidationException) {
        response.status(400).send({ message: 'Error de validación.', errors: (error as any).messages.errors.map(item => {
            return {
                "field": item.field,
                "message": item.message
            }
          })
        })
      } else {
        response.status(500).send({ message: error500 })
      }
    }
  }

  /**
   * Obtener cliente por ID.
   * 
   * @param ctx - El contexto HTTP.
   * @returns Una promesa que representa un cliente o un error correspondiente.
   */
  public async show({ request ,response, logger}: HttpContextContract) {
    try {
      const id = request.param('id',0)
      const regex = /^\d+$/;
      if (!regex.test(id)) {
        logger.info({ message: validateJustNumber('id'), ...request.params()}, 'Get ClientBy');
        return response.status(400).send({ message: validateJustNumber('id') });
      }
      const client = await Client.find(id)
      if(!client){
        logger.info({ message: clientNotFound, ...request.params()}, 'Get ClientBy');
        response.status(404).send({ message: clientNotFound })
        return
      }
      response.ok({...client.serialize({fields: { omit: ['id','full_name','created_at','updated_at'] }})})
    }catch (error) {
      logger.error({ err: error }, 'Get ClientBy');
      response.status(500).send({ message: error500 })
    }
  }
}
