import { validator } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon';

validator.rule('birthdate',
    (value, { maxAge }, options) => {
        if (!(value instanceof DateTime)) {
            return
        }
        var numerador = (new Date()).getTime() - value.toJSDate().getTime()
        if(numerador<=0){
            options.errorReporter.report(
                options.pointer,
                'birthdate.datehigher',
                'birthdate.datehigher validation failed',
                options.arrayExpressionPointer,
                { maxAge }
            )
        }
        var age = Math.floor( numerador / (1000 * 60 * 60 * 24 * 365.25))
        if(age<maxAge){
            options.errorReporter.report(
                options.pointer,
                'birthdate.maxAge',
                'birthdate.maxAge validation failed',
                options.arrayExpressionPointer,
                { maxAge }
            )
        }
    },
    ([maxAge]) => {
        return {
            compiledOptions: {
                maxAge: maxAge || 18,
            },
        }
    }
)