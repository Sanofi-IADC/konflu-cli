import Items from '../src/items';

describe('Items', () => {
  it('should return the first item', () => {
    expect(Items.getFirstItem()).toBe('Item 1');
  });
});
