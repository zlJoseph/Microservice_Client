declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        birthdate(maxAge?: number): Rule
    }
}
  