import Event from '@ioc:Adonis/Core/Event'

Event.on('new:client', 'Client.onNewClient')