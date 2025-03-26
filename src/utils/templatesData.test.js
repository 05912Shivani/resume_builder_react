import templatesData from '../utils/Data';

test('templatesData should contain valid template objects', () => {
  expect(Array.isArray(templatesData)).toBe(true);
  expect(templatesData.length).toBeGreaterThan(0);

  templatesData.forEach((template) => {
    expect(template).toHaveProperty('id');
    expect(template).toHaveProperty('name');
    expect(template).toHaveProperty('style');
    expect(template).toHaveProperty('layout');
    expect(template).toHaveProperty('colorScheme');
    expect(template.colorScheme).toHaveProperty('primary');
    expect(template.colorScheme).toHaveProperty('background');
  });
});
