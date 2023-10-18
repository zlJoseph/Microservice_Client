import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.regex(new RegExp(/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]*$/))]),
    surname: schema.string([rules.regex(new RegExp(/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]*$/))]),
    mothers_surname: schema.string.nullableAndOptional([rules.regex(new RegExp(/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]*$/))]),
    birthdate: schema.date({format: 'yyyy-MM-dd'},[rules.birthdate()])
  })

  public messages: CustomMessages = {
    required: 'El campo {{ field }} es requerido',
    'date.format': '{{ field }} no tiene el formato correcto {{ options.format }}',
    'birthdate.datehigher': 'Fecha de nacimiento no debe ser en el futuro',
    'birthdate.maxAge': 'La edad debe ser mayor o igual a 18 años',
    'regex' : 'El campo {{ field }} no tiene el formato correcto'
  }

}