import { ansiHTML } from '../src/server/ansiHTML';

describe('ansiHTML', () => {
  it('should convert ANSI color codes to HTML', () => {
    const redInput = '\x1B[31mHello, World!\x1B[0m';
    const redExpected = '<span style="color:#fb6a6a;">Hello, World!</span>';
    expect(ansiHTML(redInput)).toEqual(redExpected);

    const blueInput = '\x1B[34mHello, World!\x1B[0m';
    const blueExpected = '<span style="color:#6eb2f7;">Hello, World!</span>';
    expect(ansiHTML(blueInput)).toEqual(blueExpected);

    const greenInput = '\x1B[32mHello, World!\x1B[0m';
    const greenExpected = '<span style="color:#6ef790;">Hello, World!</span>';
    expect(ansiHTML(greenInput)).toEqual(greenExpected);

    const yellowInput = '\x1B[33mHello, World!\x1B[0m';
    const yellowExpected = '<span style="color:#eff986;">Hello, World!</span>';
    expect(ansiHTML(yellowInput)).toEqual(yellowExpected);

    const cyanInput = '\x1B[36mHello, World!\x1B[0m';
    const cyanExpected = '<span style="color:#6eecf7;">Hello, World!</span>';
    expect(ansiHTML(cyanInput)).toEqual(cyanExpected);

    const magentaInput = '\x1B[35mHello, World!\x1B[0m';
    const magentaExpected = '<span style="color:#f76ebe;">Hello, World!</span>';
    expect(ansiHTML(magentaInput)).toEqual(magentaExpected);

    const lightgreyInput = '\x1B[37mHello, World!\x1B[0m';
    const lightgreyExpected =
      '<span style="color:#f0f0f0;">Hello, World!</span>';
    expect(ansiHTML(lightgreyInput)).toEqual(lightgreyExpected);

    const darkgreyInput = '\x1B[90mHello, World!\x1B[0m';
    const darkgreyExpected = '<span style="color:#888;">Hello, World!</span>';
    expect(ansiHTML(darkgreyInput)).toEqual(darkgreyExpected);
  });

  it('should convert ANSI bold codes to HTML', () => {
    const input = '\x1B[1mHello, World!\x1B[0m';
    const expected = '<span style="font-weight:bold;">Hello, World!</span>';
    expect(ansiHTML(input)).toEqual(expected);
  });

  it('should convert ANSI dim codes to HTML', () => {
    const input = '\x1B[2mHello, World!\x1B[0m';
    const expected = '<span style="opacity:0.5;">Hello, World!</span>';
    expect(ansiHTML(input)).toEqual(expected);
  });

  it('should convert ANSI italic codes to HTML', () => {
    const input = '\x1B[3mHello, World!\x1B[0m';
    const expected = '<span style="font-style:italic;">Hello, World!</span>';
    expect(ansiHTML(input)).toEqual(expected);
  });

  it('should convert ANSI underline codes to HTML', () => {
    const input = '\x1B[4mHello, World!\x1B[0m';
    const expected =
      '<span style="text-decoration:underline;">Hello, World!</span>';
    expect(ansiHTML(input)).toEqual(expected);
  });

  it('should convert ANSI delete codes to HTML', () => {
    const input = '\x1B[9mHello, World!\x1B[0m';
    const expected =
      '<span style="text-decoration:line-through;">Hello, World!</span>';
    expect(ansiHTML(input)).toEqual(expected);
  });
});
