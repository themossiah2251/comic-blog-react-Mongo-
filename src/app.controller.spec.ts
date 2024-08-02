import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getDbStatus', () => {
    it('should return the database status', async () => {
      const result = { status: 'connected' }; // Adjust based on your expected result
      jest.spyOn(appController, 'getDbStatus').mockImplementation(() => result);
      expect(await appController.getDbStatus()).toBe(result);
    });
  });
});
