import type { NextConfig } from "next"
import withFlowbiteReact from "flowbite-react/plugin/nextjs"

const nextConfig: NextConfig = {
  images: {
    domains: ["upload.wikimedia.org"],
  },
}

export default withFlowbiteReact(nextConfig)
