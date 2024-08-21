'use client';

import { Metadata } from 'next';
import { BASE_URL } from '../../../lib/constants';
import { useEffect, useState } from 'react';
import { Button, Result, message } from 'antd';
import CustomLoading from '../../../components/custom-loading';
import Title from 'antd/es/typography/Title';

export default function FindIpPage() {
  const [ip, setIp] = useState('');
  const [fail, setFail] = useState(false);  
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    loadIp();
  }, []);

  const loadIp = () => {
    fetch('https://api64.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        console.log('사용자 IP 주소:', data.ip);
        setIp(data.ip);
      })
      .catch((error) => {
        console.error('IP 주소를 가져오는 데 실패했습니다:', error);
        setFail(true);
        setIp('');
      });
  };
  
  const copyIp = () => {
    navigator.clipboard.writeText(ip)
    .then(() => {
      messageApi.open({
        type: 'success',
        content: '텍스트가 클립보드에 복사되었습니다.',
      });
    })
    .catch(err => {
      messageApi.open({
        type: 'success',
        content: '클립보드에 복사 실패',
      });
    });
  };

  return (
    <>
      {contextHolder}
      <div className="lg:p-20 w-[100%] px-2 py-10">
        <div className="flex justify-center items-center w-[100%] box">
          <div className="">
            <div>
              <Title className="text-center lg:text-5xl text-2xl" level={2}>
                내 IP 주소는?
              </Title>
            </div>
            <div>
              {ip ? (
                <Result
                  status="success"
                  title={<span className='break-all lg:text-2xl text-lg'>{ip} <span onClick={copyIp} className={'cursor-pointer'}>📋</span></span>}
                  subTitle="성공적으로 IP를 찾았습니다."
                  extra={[
                    <Button type="primary" key="console" onClick={loadIp}>
                      다시시도
                    </Button>,
                  ]}
                />
              ) : fail ? (
                <Result
                  status="error"
                  title={'IP를 찾지 못했습니다.'}
                  subTitle="IP를 찾지 못했습니다. 다시 시도해보세요."
                  extra={[
                    <Button type="primary" key="console" onClick={loadIp}>
                      다시시도
                    </Button>,
                  ]}
                />
              ) : (
                <CustomLoading />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
