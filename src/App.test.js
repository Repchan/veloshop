const productService = require('./services/product-service'); // Подставьте путь к вашему сервису

describe('addProduct function', () => {
  let serviceInstance;

  beforeEach(() => {

    const mockQuery = jest.fn((query, values, callback) => {
      callback(null, 'mocked result', 'mocked fields');
    });

    serviceInstance = new productService();
    serviceInstance.connection = {
      query: mockQuery
    };
  });

  it('should resolve with success message when product is successfully added', async () => {
    const productData = {
      Name: 'Test Product',
      Brand: 'Test Brand',
      Type: 'Test Type',
      Color: 'Test Color',
      Price: 10,
      QuantityInStock: 100,
      Category: 'Test Category',
      StoreID: 1,
      Description: 'Test Description',
      ShortDescription: 'Test Short Description'
    };

    const result = await serviceInstance.addProduct(productData);

    expect(result).toEqual({ success: true, message: 'Товар успешно добавлен' });
  });

});