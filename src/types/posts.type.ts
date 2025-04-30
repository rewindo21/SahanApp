export type InstagramPostProps = {
    id: string
    media_type: 'IMAGE' | 'VIDEO' | 'ALBUM'
    media_url: string
    timestamp: Date
    caption?: string
}