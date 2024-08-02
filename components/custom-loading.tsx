
import { Flex, Spin, SpinProps } from "antd"
import { SpinSize } from "antd/lib/spin"

export default function CustomLoading({
  size = 'large',
}: {
  size?: SpinSize
}) {
  return (
    <div className="w-full h-full flex justify-center content-center">
      <Spin tip="Loading" size={size}></Spin>
    </div>
  )
}
