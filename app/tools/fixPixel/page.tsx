'use client';

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Result, message } from 'antd';
import CustomLoading from '../../../components/custom-loading';
import Title from 'antd/es/typography/Title';
import { log } from 'console';

const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffffff'];

const faqList = [
  {
    q: '죽은 픽셀은 뭔가요?',
    a: '죽은 픽셀(Dead Pixel)은 디스플레이 장치에서 특정 픽셀이 항상 꺼져 있거나 색상을 표시하지 않는 현상을 말합니다.\n 즉, 그 픽셀이 화면에서 완전히 검은색으로 보이거나 어떤 색상도 나타내지 않아, 화면의 일부가 제대로 표시되지 않는 상태입니다.',
  },
  {
    q: '죽은 픽셀의 원인은 뭔가요?',
    a: '1. 제조 결함: 디스플레이 패널 제조 과정에서 발생할 수 있는 결함으로, 픽셀이 제대로 작동하지 않을 수 있습니다.\n2.물리적 손상: 화면에 물리적인 충격이나 압력이 가해지면 픽셀이 손상될 수 있습니다.\n3.열 문제: 과열로 인해 내부 회로가 손상되거나 픽셀이 작동하지 않을 수 있습니다.',
  },
  {
    q: '죽은 픽셀 해결 방법이 뭔가요?',
    a: '1. 픽셀 재생: 고착된 픽셀의 경우, 특정 색상으로 빠르게 깜박이는 이미지를 보여주어 픽셀이 정상적으로 작동하도록 유도할 수 있습니다.\n2. 물리적 압력: 조심스럽게 해당 픽셀에 압력을 가해보는 방법도 있으나, 이 방법은 화면에 추가적인 손상을 줄 수 있으므로 주의가 필요합니다.\n3. 교환 또는 수리: 제조사의 보증 기간 내라면, 제품을 교환하거나 수리 요청을 할 수 있습니다.',
  },
];

export default function FixPixelPage() {
  const sectionSize = 64;
  const squareSize = 1;
  const canvasSize = 256;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [startFlg, setStartFlg] = useState(false);
  const [showStop, setShowStop] = useState(false);
  const [intervalFunc, setIntervalFunc] = useState<NodeJS.Timeout | null>(null);
  const [bgColorIdx, setBgColorIdx] = useState(0);

  // Draggable functionality

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas == null) {
      return;
    }
    canvas.width = 50;
    canvas.height = 50;
    setCtx(canvas.getContext('2d'));
  }, []);

  useEffect(() => {
    if (startFlg) {
      canvasRef.current?.addEventListener('mousedown', onMDCanvas);
      containerRef.current?.addEventListener('mousedown', showStopButton);
      document.addEventListener('mousemove', onMMCanvas);
      document.addEventListener('mouseup', onMUCanvas);
      canvasRef.current?.addEventListener('touchstart', onTSCanvas);
      document.addEventListener('touchmove', onTMCanvas);
      document.addEventListener('touchend', onTECanvas);
    }

    return () => {
      canvasRef.current?.removeEventListener('mousedown', onMDCanvas);
      containerRef.current?.removeEventListener('mousedown', showStopButton);
      document.removeEventListener('mousemove', onMMCanvas);
      document.removeEventListener('mouseup', onMUCanvas);
      canvasRef.current?.removeEventListener('touchstart', onTSCanvas);
      document.removeEventListener('touchmove', onTMCanvas);
      document.removeEventListener('touchend', onTECanvas);
    };
  }, [isDragging, startFlg]);

  const onClickChangeColor = () => {
    setBgColorIdx((prev) => {
      return prev + 2 >= colors.length ? 0 : prev + 1;
    });
  };

  const onClickStart = () => {
    setStartFlg(true);
    setIntervalFunc(setInterval(drawRandomPixels, 10));
    if (containerRef.current == null || canvasRef.current == null) return;

    const body = document.querySelector('body');
    if(body != null && body.style){
      body.style.overflow = 'hidden';
    }
    
    containerRef.current.style.position = 'fixed';
    containerRef.current.style.top = '0';
    containerRef.current.style.left = '0';
    containerRef.current.style.height = '100vh';
    containerRef.current.style.width = '100vw';
    containerRef.current.style.zIndex = '999';

    canvasRef.current.style.top = '100px';
    canvasRef.current.style.left = '100px';
  };

  const onClickStop = () => {
    setStartFlg(false);
    setShowStop(false);
    clearInterval(intervalFunc ?? undefined);
    if (containerRef.current == null || canvasRef.current == null) return;

    const body = document.querySelector('body');
    if(body != null && body.style){
      body.style.overflow = 'unset';
    }

    containerRef.current.style.position = 'relative';
    containerRef.current.style.height = '200px';
    containerRef.current.style.width = '200px';
    containerRef.current.style.zIndex = '0';
    canvasRef.current.style.top = '100px';
    canvasRef.current.style.left = '100px';
  };

  const showStopButton = () => {
    setShowStop((prev) => !prev);
  };

  let currentX = 0;
  let currentY = 0;

  const drawRandomPixels = () => {
    // Draw the 32x32 section pixel by pixel
    for (let x = currentX; x < currentX + sectionSize; x++) {
      for (let y = currentY; y < currentY + sectionSize; y++) {
        if (ctx != null) {
          ctx.fillStyle = getRandomColor();
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
    }

    var lines = canvasSize / sectionSize;
    var destX;
    var destY;
    var column;

    for (let y = 0; y <= lines; y++) {
      if (y == 0) {
        column = 1;
      } else {
        column = 0;
      }
      for (let z = column; z <= lines; z++) {
        destX = z * sectionSize;
        destY = y * sectionSize;

        copySection(0, 0, destX, destY, sectionSize, sectionSize);
      }
    }
  };

  const copySection = (
    srcX: number,
    srcY: number,
    destX: number,
    destY: number,
    sectionWidth: number,
    sectionHeight: number,
  ) => {
    // Get the image data from the source section
    if (ctx != null) {
      const imageData = ctx.getImageData(srcX, srcY, sectionWidth, sectionHeight);
      // Put the image data in the destination section
      ctx.putImageData(imageData, destX, destY);
    }
  };

  // 드래그
  const onMDCanvas = useCallback(
    (e: MouseEvent) => {
      const rect: DOMRect | undefined = canvasRef.current?.getBoundingClientRect();
      if (rect != null) {
        setDragStartX(e.pageX - rect.left); // Use pageX/Y for Safari
        setDragStartY(e.pageY - rect.top);
        setIsDragging(true);
      }
    },
    [ctx, isDragging],
  );

  const onMMCanvas = useCallback(
    (e: MouseEvent) => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (isDragging) {
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          canvas.style.position = 'absolute'; // Set position for dragging
          // setLeft(e.pageX - dragStartX + 'px');
          canvas.style.left = e.pageX - dragStartX + 'px';
          canvas.style.top = e.pageY - dragStartY + 'px';
        }
      }
    },
    [ctx, isDragging],
  );

  const onMUCanvas = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTSCanvas = useCallback(
    (e: TouchEvent) => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setDragStartX(e.touches[0].clientX - rect.left);
        setDragStartY(e.touches[0].clientY - rect.top);
        setIsDragging(true);
      }
    },
    [ctx, isDragging],
  );

  const onTMCanvas = useCallback((e: TouchEvent) => {
    if (isDragging) {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvas.style.position = 'absolute'; // Set position for dragging
        canvas.style.left = e.touches[0].clientX - dragStartX + 'px';
        canvas.style.top = e.touches[0].clientY - dragStartY + 'px';
      }
    }
  }, [ctx,isDragging]);

  const onTECanvas = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getRandomColor = () => {
    let clrs = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return clrs[Math.floor(Math.random() * 8)];
  };

  return (
    <>
      <div className="lg:p-20 w-[100%] px-2 py-10">
        <div className="flex justify-center items-center w-[100%] box">
          <div className="">
            <div>
              <Title className="text-center lg:text-5xl text-2xl" level={2}>
                죽은 픽셀을 살려보자
              </Title>
            </div>
            <div
              style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '1000',
                display: showStop ? 'unset' : 'none',
              }}>
              <Button onClick={onClickChangeColor}>색상변경</Button>
              <Button
                className="ml-5"
                style={{ backgroundColor: 'red', color: 'white', border: 'none' }}
                onClick={onClickStop}>
                종료하기
              </Button>
            </div>
            <Title level={5} className="text-stone-600">
              {`죽은 픽셀 살리는 방법 : \n1. 기기의 자동 잠금 설정과 화면보호기를 꺼주세요. 지속적인 픽셀에 대한 자극이필요합니다.\n2. 시작하기 버튼을 누르면 까만색의 화면 안에 깜빡이는 점을 드래그하여 배드 픽셀이 있는 곳으로움직이세요.\n3. 죽은 픽셀 부분에 많은 자극이 필요함으로 20분 이상 시도 할 것을 추천합니다.\n4. 아무곳이나 클릭하면 멈출 수 있는 버튼과 색상 변경버튼이 나옵니다.`}
            </Title>
            <Button className="m-3" type="primary" onClick={onClickStart}>
              시작하기
            </Button>
            <div className="flex justify-center items-center ">
              <div
                ref={containerRef}
                className={`h-[200px] w-[200px] relative`}
                style={{ backgroundColor: colors[bgColorIdx] }}>
                <canvas ref={canvasRef} width={50} height={50} className="absolute left-0" />
              </div>
            </div>
            <div className="flex justify-center items-center flex-col w-[100%] box my-10 text-left">
              <Title level={3} className="text-blue-950">
                FAQ
              </Title>
              {faqList.map((item, idx) => (
                <div key={idx}>
                  <Title level={5} className="text-">
                    <b>Q. {item.q}</b>
                  </Title>
                  <Title level={5}>
                    <b>A.</b> {item.a}
                  </Title>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
