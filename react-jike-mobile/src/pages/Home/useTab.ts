import type { ChannelItem } from '@/apis/list'
import { fetchChannelApi } from '@/apis/list'
import { useEffect, useState } from 'react'

export const useTab = () => {
    const [channels, setChannels] = useState<ChannelItem[]>([])

    useEffect(() => {
        const getChannels = async () => {
            try {
                const res = await fetchChannelApi()
                setChannels(res.data.data.channels)
            } catch (error) {
                throw new Error('fetch channels error', { cause: error })
            }
        }
        // 执行请求
        getChannels()
    }, [])

    return {
        channels, 
    }
} 


