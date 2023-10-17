import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import { unauthorized } from 'Config/display';

export default class Auth {
  public async handle({ response, request, logger }: HttpContextContract, next: () => Promise<void>) {
    
    if (request.url() === '/_ah/start') {//request de calentamiento por app engine basic scaling
      return response.status(200).send('OK')
    }

    if(Env.get('NODE_ENV') !== 'production'){
      const method = request.method();
      const url = request.completeUrl()
      const headers = request.headers();
      const body = request.body()
      logger.info({ method, url, headers, body }, 'Request Middleware');
    }

    if(request.header('X-API-Key','') !== Env.get('API_KEY')){
      logger.warn({warn: unauthorized,headers: request.headers()}, 'Request Middleware')
      response.unauthorized({ error: unauthorized })
      return
    }

    await next()
  }
}