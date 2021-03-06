import { maybe } from './maybe';
import { string, oneOf } from './string';

test('string returns false for non-strings', () => {
  expect(string()(undefined).errors).toBe('string');
  expect(string()(undefined).data).toBeUndefined();
  expect(string()(null).data).toBeUndefined();
  expect(string()(1).data).toBeUndefined();
  expect(string()(NaN).data).toBeUndefined();
  expect(string()(true).data).toBeUndefined();
  expect(string()({ key: 'this-is-a-key' }).data).toBeUndefined();
  expect(string()(['this-is-a-key']).data).toBeUndefined();
  expect(string()('').data).toBeUndefined();
  expect(string('an-other-error')(undefined).errors).toBe('an-other-error');
});

test('string returns true for strings', () => {
  expect(string()('this-is-a-string').data).toBe('this-is-a-string');
  expect(maybe(string())('this-is-a-string').errors).toBeUndefined();
  expect(string()('1').data).toBe('1');
});

test('string returns false for non-strings', () => {
  expect(maybe(string())(null).errors).toBe('string');
  expect(maybe(string())(null).data).toBeUndefined();
  expect(maybe(string())(1).data).toBeUndefined();
  expect(maybe(string())(NaN).data).toBeUndefined();
  expect(maybe(string())(true).data).toBeUndefined();
  expect(maybe(string())({ key: 'this-is-a-key' }).data).toBeUndefined();
  expect(maybe(string())(['this-is-a-key']).data).toBeUndefined();
  expect(maybe(string())('').data).toBeUndefined();
});

test('string returns true for strings', () => {
  expect(maybe(string())('this-is-a-string').data).toBe('this-is-a-string');
  expect(maybe(string())('1').data).toBe('1');
  expect(maybe(string())(undefined).data).toBeUndefined();
  expect(maybe(string())(undefined).errors).toBeUndefined();
});

test('one of test', () => {
  expect(oneOf(['a', 'b', 'c'])('this-is-not-one-of').errors).toBe('oneOf');
  expect(oneOf(['a', 'b', 'c'], 'one-of-error')('this-is-not-one-of').errors).toBe('one-of-error');
  expect(oneOf(['a', 'b', 'c'])('a').data).toBe('a');
  expect(oneOf(['a', 'b', 'c'])('b').data).toBe('b');
  expect(oneOf(['a', 'b', 'c'])('c').data).toBe('c');
});
