
import { Flex, Spin, SpinProps } from "antd"
import { SpinSize } from "antd/lib/spin"

export default function CustomLoading({
  size = 'large',
}: {
  size?: SpinSize
}) {
  return (
    <div className="w-full min-h-96 h-full flex justify-center content-center items-center">
      <Spin tip="Loading" size={size}></Spin>
    </div>
  )
}
