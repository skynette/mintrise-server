import axios from 'axios';

export const signTransactionsToronet = async (
  address: string,
  password: string
) => {
  console.log({ address, password });
  const response = await axios.post(
    'https://www.toronet.org/api/keystore/',
    {
      op: 'signMessage',
      params: [
        {
          name: 'addr',
          value: address,
        },
        {
          name: 'pwd',
          value: password,
        },
        {
          name: 'message',
          value: 'Login to Mintrise',
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const message = await response.data;
  console.log(message);

  return message;
};
