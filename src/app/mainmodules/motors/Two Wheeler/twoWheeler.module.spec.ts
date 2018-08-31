import { TwoWheelerModule } from './twoWheeler.module';

describe('CarModule', () => {
  let carModule: TwoWheelerModule;

  beforeEach(() => {
    carModule = new TwoWheelerModule();
  });

  it('should create an instance', () => {
    expect(carModule).toBeTruthy();
  });
});
