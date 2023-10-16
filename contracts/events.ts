declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'new:client': { age: number, name: string, surname: string, mothers_surname: string }
  }
}
