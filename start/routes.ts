import Route from '@ioc:Adonis/Core/Route'
import { invalidroute } from 'Config/display';

Route.group(()=>{
  Route.resource('v1/clients','v1/ClientsController').apiOnly()
}).prefix("api")

Route.any('*', ({ response }) => {
  response.status(404).send({ message: invalidroute });
});