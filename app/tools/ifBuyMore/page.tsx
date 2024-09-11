'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Input, Result, message } from 'antd';
import CustomLoading from '../../../components/custom-loading';
import Title from 'antd/es/typography/Title';
import { BASE_URL, IntlKoNumber } from '../../../lib/constants';

export default function IfBuyMorePage() {
  const [currentAvgPrice, setCurrentAvgPrice] = useState<string>('');
  const [currentQuantity, setCurrentQuantity] = useState<string>('');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [buyQuantity, setBuyQuantity] = useState<string>('');

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>, _setState: Dispatch<SetStateAction<any>>) => {
    const { value: inputValue } = e.target;
    const reg = /^[0-9]+$/g;
    if (reg.test(inputValue.replaceAll(',', ''))) {
      _setState(IntlKoNumber.format(parseInt(inputValue?.replaceAll(',', '')) ?? ''));
    } else if (inputValue === '') {
      _setState('');
    }
  };

  const getIfBuyMorePrice = () => {
    const _currentAvgPrice = parseInt(currentAvgPrice.replaceAll(',', '') ?? 0);
    const _currentQuantity = parseInt(currentQuantity.replaceAll(',', '') ?? 0);
    const _buyPrice = parseInt(buyPrice.replaceAll(',', '') ?? 0);
    const _buyQuantity = parseInt(buyQuantity.replaceAll(',', '') ?? 0);
    if (!currentAvgPrice) {
      return '현재 평균단가를 입력해주세요.';
    } else if (!currentQuantity) {
      return '보유 수량을 입력해주세요.';
    } else if (!buyPrice) {
      return '구매할 가격을 입력해주세요.';
    } else if (!buyQuantity) {
      return '구매할 수량을 입력해주세요.';
    }
    return (
      '물타기 평균 단가 : ' +
      IntlKoNumber.format(
        (_currentAvgPrice * _currentQuantity + _buyPrice * _buyQuantity) / (_currentQuantity + _buyQuantity),
      ) +
      ' 원'
    );
  };
  const getIfBuyMoreQuantity = () => {
    const _currentQuantity = parseInt(currentQuantity.replaceAll(',', '') ?? 0);
    const _buyQuantity = parseInt(buyQuantity.replaceAll(',', '') ?? 0);
    if (!currentQuantity || !buyQuantity) {
      return null;
    }
    return IntlKoNumber.format(_currentQuantity + _buyQuantity) + ' 개';
  };
  const getIfBuyMoreTotPrice = () => {
    const _currentAvgPrice = parseInt(currentAvgPrice.replaceAll(',', '') ?? 0);
    const _currentQuantity = parseInt(currentQuantity.replaceAll(',', '') ?? 0);
    const _buyPrice = parseInt(buyPrice.replaceAll(',', '') ?? 0);
    const _buyQuantity = parseInt(buyQuantity.replaceAll(',', '') ?? 0);
    if (!currentAvgPrice || !currentQuantity || !buyPrice || !buyQuantity) {
      return null;
    }
    return IntlKoNumber.format(_currentAvgPrice * _currentQuantity + _buyPrice * _buyQuantity) + ' 원';
  };

  return (
    <>
      <div className="lg:p-20 w-[100%] px-2 py-10">
        <div className="flex justify-center items-center w-[100%] box">
          <div className="">
            <div>
              <Title className="text-center lg:text-5xl text-2xl" level={2}>
                물타기 계산기
              </Title>
              <Title className="text-center" style={{ color: '#747474' }} level={5}>
                현재 가지고 있는 주식/코인의 평균 단가를 입력 후 더 사고싶은 싶은 가격과 주식 수를 입력하세요.
              </Title>
            </div>
            <div className="p-5">
              <div className="flex justify-start items-start gap-3 flex-wrap">
                <div className="w-[48%] text-left">
                  <Title level={5}>현재 평균단가</Title>
                  <Input
                    placeholder="1000"
                    onChange={(e) => onChangeInputs(e, setCurrentAvgPrice)}
                    value={currentAvgPrice ?? ''}
                  />
                </div>
                <div className="w-[48%] text-left">
                  <Title level={5}>보유 수량</Title>
                  <Input
                    placeholder="10"
                    onChange={(e) => onChangeInputs(e, setCurrentQuantity)}
                    value={currentQuantity ?? ''}
                  />
                </div>
                <div className="w-[48%] text-left">
                  <Title level={5}>구매할 가격</Title>
                  <Input placeholder="1000" onChange={(e) => onChangeInputs(e, setBuyPrice)} value={buyPrice ?? ''} />
                </div>
                <div className="w-[48%] text-left">
                  <Title level={5}>구매할 수량</Title>
                  <Input
                    placeholder="10"
                    onChange={(e) => onChangeInputs(e, setBuyQuantity)}
                    value={buyQuantity ?? ''}
                  />
                </div>
              </div>
              <div className="pt-8">
                <Title level={5}> {getIfBuyMorePrice()}</Title>
                {getIfBuyMoreTotPrice() && <Title level={5}>물타기 총 매수 비용 : {getIfBuyMoreQuantity()}</Title>}
                {getIfBuyMoreQuantity() && <Title level={5}>물타기 보유 수량 : {getIfBuyMoreQuantity()}</Title>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
