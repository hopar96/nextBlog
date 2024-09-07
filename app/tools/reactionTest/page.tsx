'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, FloatButton, Result, message } from 'antd';
import CustomLoading from '../../../components/custom-loading';
import Title from 'antd/es/typography/Title';
import { getRandomNumber } from '../../../lib/utils';
import UAParser from 'ua-parser-js';
import { BASE_URL } from '../../../lib/constants';
import { ShareAltOutlined } from '@ant-design/icons';

enum TestStatus {
  first,
  ready,
  start,
  end,
  cheating,
}

export default function ReactionTestPage() {
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [testStatus, setTestStatus] = useState<TestStatus>(TestStatus.first);
  const [startTime, setStartTime] = useState<number | null>(null);

  // const ua = navigator.userAgent;
  // const device = new UAParser(ua || '').getDevice();
  // const isMobile = device.type === 'mobile';

  const startTest = () => {
    setTestStatus(TestStatus.ready);
    const randomMiliSec = getRandomNumber(1000, 10000);
    setStartTime(null);
    setTimeout(() => {
      setTestStatus(TestStatus.start);
      runTime();
    }, randomMiliSec);
  };

  const runTime = () => {
    setStartTime(performance.now());
  };

  const endTest = () => {
    if (startTime) {
      setReactionTime(Math.floor(performance.now() - startTime));
      setTestStatus(TestStatus.end);
    } else {
      setTestStatus(TestStatus.cheating);
    }
  };

  const getBgColor = (_testStatus: TestStatus) => {
    return _testStatus == TestStatus.start
      ? 'bg-red-500'
      : _testStatus == TestStatus.ready
        ? 'bg-blue-600'
        : _testStatus == TestStatus.cheating
          ? 'bg-red-500'
          : 'bg-green-500';
  };

  const onClickButton = () => {
    if (testStatus == TestStatus.first || testStatus == TestStatus.end || testStatus == TestStatus.cheating) {
      startTest();
    } else if (testStatus == TestStatus.ready) {
      setTestStatus(TestStatus.cheating);
    } else if (testStatus == TestStatus.start) {
      endTest();
    }
  };

  const getMainText = (_testStatus: TestStatus) => {
    return _testStatus == TestStatus.start
      ? '클릭!! 눌러!!'
      : _testStatus == TestStatus.ready
        ? '빨간색이 보이면 클릭!!'
        : _testStatus == TestStatus.cheating
          ? '삐-빅! 반칙입니다. 클릭하여 다시시도 하세요.'
          : _testStatus == TestStatus.end
            ? `반응속도 : ${reactionTime} ms\n클릭하여 다시 시작`
            : '클릭하여 반응속도 테스트 진행!';
  };

  const getSubText = (_testStatus: TestStatus) => {
    if (_testStatus == TestStatus.end && reactionTime) {
      if (reactionTime < 100) {
        return '신계!! 어디가서 자랑해도됨 ㄹㅇㅋㅋ';
      } else if (reactionTime < 150) {
        return '초인계!! 프로게이머해도 될 듯';
      } else if (reactionTime < 200) {
        return '인간계!! 좀 치네?';
      } else if (reactionTime < 300) {
        return '느려! 그건 제 잔상입니다만';
      } else {
        return '할배요~ 오셨능교~ 👴🏻🖐️';
      }
    }
    let _subText =
      _testStatus == TestStatus.start
        ? '눌러!눌러!눌러!눌러!눌러!눌러!눌러!눌러!'
        : _testStatus == TestStatus.ready
          ? '빨간색이 보이면 클릭해주세요'
          : _testStatus == TestStatus.cheating
            ? '예측 샷은 노인정입니다. 빨간색을 보고 눌러주세요.'
            : '시작 후 빨간 색이 나오면 클릭하여 반응속도를 측정할 수 있습니다.';

    return _subText;
  };

  const onClickShare = () => {
    navigator.share({
      title: '반응속도 테스트',
      text: `${reactionTime ? `반응속도 테스트 결과 : ${reactionTime}ms! \n` : ''}내 반응속도 확인하러가기`,
      url: `${BASE_URL}/tools/reactionTest`,
    });
  };

  return (
    <>
      <div className="lg:p-20 w-[100%] px-2 py-10">
        <div className=" w-[100%] box">
          <div>
            <div className='flex justify-between items-end'>
              <Title className="lg:text-5xl text-2xl text-left mt-10 ml-10" level={2}>
                반응속도 테스트
              </Title>
              <Button className='mb-3' onClick={onClickShare}>공유하기</Button>
              <FloatButton onClick={onClickShare} icon={<ShareAltOutlined />} />
            </div>
            <div>
              <div
                onClick={onClickButton}
                className={`flex justify-center items-center flex-col lg:h-[500px] h-[40vh] w-full box ${getBgColor(testStatus)}`}>
                <Title className="text-center lg:text-5xl text-2xl" style={{ color: '#ffffff' }} level={2}>
                  {getMainText(testStatus)}
                </Title>
                <Title className="text-center lg:text-5xl text-2xl mb-10" style={{ color: '#eee' }} level={4}>
                  {getSubText(testStatus)}
                </Title>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
