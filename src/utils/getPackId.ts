export const getPackId = () => {
    const data = localStorage.getItem('packId')
    // console.log(data)
    return data ? data : ''
}
export const getPackUserId = () => {
    const data = localStorage.getItem('packUserId')
    // console.log(data)
    return data ? data : ''
}

export const getUserId = () => {
    const data = localStorage.getItem('userId')
    // console.log(data)
    return data ? data : ''
}

