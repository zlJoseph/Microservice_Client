import type { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios';

export default class Client {
    public async onNewClient(user: EventsList['new:client']) {
        try {
            Logger.info({data: user}, 'Event Init: New Client');
            const response = await axios.put(Env.get('API_ENDPOINT_ANALYTICS')+'/kpis', user, {
                headers: {
                    'X-APP-Key': Env.get('APP_KEY_ANALYTICS')
                },
            });
            Logger.info({data: user, success: response.data}, 'Event Success: New Client');
        } catch (error) {
            Logger.error({ err: error }, 'Event Error: New Client');
        }
    }
}
