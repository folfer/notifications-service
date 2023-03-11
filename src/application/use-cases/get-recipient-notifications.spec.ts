import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-another-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-another-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'test-another-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'test-another-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'test-another-1' }),
        expect.objectContaining({ recipientId: 'test-another-1' }),
      ]),
    );
  });
});
