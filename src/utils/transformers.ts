import $, {Transformer, ok, error, ValidationError} from 'transform-ts';
import dayjs from 'dayjs';

export const map = <A, B>(f: (x: A) => B) =>
  Transformer.from<A, B>((x) => ok(f(x)));

export const int = $.number.compose(
  Transformer.from((x) => {
    if (Number.isSafeInteger(x)) {
      return ok(x);
    }
    return error(ValidationError.from(new Error('Not an integer.')));
  }),
);

export const unsafeCoerce = <A, B>() => Transformer.from<A, B>(ok as any);

export const iso8601 = $.string.compose(
  Transformer.from((str) => {
    const day = dayjs(str);
    if (!day.isValid) {
      return error(ValidationError.from(new Error('invalid date string')));
    }
    return ok(day);
  }),
);
