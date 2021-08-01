const socmedList = [
    {
        name: 'facebook',
        bg: 'bg-blue-600',
        shareLink: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
        name: 'twitter',
        bg: 'bg-blue-400',
        shareLink: (url, text) => `https://twitter.com/intent/tweet?url=${url}&text=${text}`
    },
    {
        name: 'whatsapp',
        bg: 'bg-green-500',
        shareLink: (url, text) => `https://api.whatsapp.com/send?text=${url}`
    },
]

export default socmedList