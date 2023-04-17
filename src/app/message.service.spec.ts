import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    service = new MessageService();

    service.add('Message 1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove all the messages', () => {
    // arrange
    service.add('Message 1');

    // act
    service.clear();

    // assert
    expect(service.messages.length).toBe(0);
  });
});
