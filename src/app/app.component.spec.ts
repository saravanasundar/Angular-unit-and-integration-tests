import { AppComponent } from './app.component';

describe('AppComponent:', () => {
  it('should load app component', () => {
    const comp = new AppComponent();

    expect(comp).toBeTruthy();
  });
});
