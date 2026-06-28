import { http } from "@/utils"
import type { ResType } from "./common"

export type ChannelItem = {
    id : number,
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}


// 请求频道列表
export function fetchChannelApi() {
    return http.request<ResType<ChannelRes>>({
        url: "/channels",
    })
}