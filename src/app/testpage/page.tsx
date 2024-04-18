'use client';

import { request } from '@/utils/request';

export default function testPage() {
  const handleClick = async () => {
    const res = await request.post('/loginOrRegister?type=login', {
      userName: 'admin01',
      userPassword: 'Qq123456!',
    });

    console.log('res', res);
  };

  return <button onClick={handleClick}>test</button>;
}
