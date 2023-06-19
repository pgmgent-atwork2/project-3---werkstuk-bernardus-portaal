import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';
import { getFeedbacks } from '../controllers/feedback.js';
import jest from 'jest';

describe('getFeedbacks', () => {
  test('should render feedback template with correct data', async () => {
    const req = {
      cookies: {
        token: 'your-token-value',
      },
      user: {
        id: 'your-user-id',
      },
    };

    const feedbacks = [
      {
        id: 1,
        subject: 'Math',
        teacher: 'John Doe',
        comment: 'Great job!',
      },
      {
        id: 2,
        subject: 'Science',
        teacher: 'Jane Smith',
        comment: 'Needs improvement.',
      },
    ];

    // Mock the dependencies
    jwt.decode = jest.fn().mockReturnValue({ userId: req.user.id });
    DataSource.getRepository = jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(feedbacks),
    });

    const renderMock = jest.fn();

    const res = {
      render: renderMock,
    };

    await getFeedbacks(req, res);

    expect(renderMock).toHaveBeenCalledWith('feedback', {
      user: req.user,
      feedbackData: feedbacks,
      title: 'Feedback',
    });

    expect(jwt.decode).toHaveBeenCalledWith(req.cookies.token);
    expect(DataSource.getRepository).toHaveBeenCalledWith('Feedback');
    expect(DataSource.getRepository().find).toHaveBeenCalledWith({
      where: {
        student: { id: req.user.id },
      },
      relations: ['subjects', 'teacher'],
    });
  });
});
