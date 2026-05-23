import { CustomError } from '../customError';

class Validator {
  data: number | string;

  constructor(data: any) {
    this.data = data;
  }
}

class StringValidator extends Validator {
  constructor(data: string) {
    if (typeof data !== 'string') {
      throw new CustomError('O valor passado não é uma string', 400);
    }
    super(data);
  }
}

export class NumberValidator extends Validator {
  constructor(data: number) {
    if (typeof data !== 'number') {
      throw new CustomError('O valor passado não é uma number', 400);
    }
    super(data);
  }
}

abstract class RegexValidator extends StringValidator {
  protected _regex = new RegExp('');

  constructor(data: string, message: string) {
    super(data);
    if (!this.regex.test(data)) throw new CustomError(message, 400);
  }

  protected get regex(): RegExp {
    return this._regex;
  }
}

export class EmailValidator extends RegexValidator {
  constructor(data: string) {
    super(data, 'Error: invalid Email.');
  }

  protected get regex(): RegExp {
    return /^(\w+(\.\w+)*@\w+(\.\w{2,})+(\.\w{2}){0,1})$/gim;
  }
}

export class NameValidator extends RegexValidator {
  constructor(data: string) {
    super(data, 'Error: invalid Name.');
  }

  protected get regex(): RegExp {
    return /^[a-zA-Z0-9áéíóúâêîôûãõÁÉÍÓÚÂÊÎÔÛÃÕàèìòùÀÈÌÒÙçÇäëïöüÄËÏÖÜ_ ]+$/gim;
  }
}

export class PasswordValidator extends RegexValidator {
  constructor(data: string) {
    super(data, 'Error: invalid Password.');
  }

  protected get regex(): RegExp {
    return /^[^\s]+$/gim;
  }
}

export class NameCommunityValidator extends RegexValidator {
  constructor(data: string) {
    super(data, 'Error: Invalid community name.');
  }

  protected get regex(): RegExp {
    return /^[a-zA-Z0-9áéíóúâêîôûãõÁÉÍÓÚÂÊÎÔÛÃÕàèìòùÀÈÌÒÙçÇäëïöüÄËÏÖÜ  ]+$/gim;
  }
}

export class GoalTypeValidator extends RegexValidator {
  constructor(data: string) {
    super(
      data,
      "Tipo de Meta inválida, só são aceitos os tipos 'days', 'time' e 'chapters'",
    );
  }

  protected get regex(): RegExp {
    return /^(days|time|chapters)$/gim;
  }
}

export class DateValidator extends RegexValidator {
  constructor(data: string) {
    super(data, 'Error: invalid Date.');
  }

  protected get regex(): RegExp {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/gim;
  }
}
