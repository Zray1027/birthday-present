/**
 * 获取当前运行环境
 * @returns 当前环境名称，默认为 'development'
 */
export const getEnv = () => {
  return (import.meta as any).env?.MODE || 'development'
}

/**
 * 计算从指定日期到今天的天数
 * @param startDate 开始日期字符串 (YYYY-MM-DD 格式)
 * @returns 天数
 */
export const getDaysSinceDate = (startDate: string): number => {
  const start = new Date(startDate)
  const today = new Date()
  
  // 计算时间差（毫秒）
  const timeDiff = today.getTime() - start.getTime()
  
  // 转换为天数
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
  
  return daysDiff
}

/**
 * 计算从认识日期到今天的生日重复次数
 * @param meetingDate 认识日期字符串 (YYYY-MM-DD 格式)
 * @param birthday 生日日期字符串 (MM-DD 格式)
 * @returns 生日次数
 */
export const getBirthdayCountSinceMeeting = (meetingDate: string, birthday: string): number => {
  const meeting = new Date(meetingDate)
  const today = new Date()
  
  // 解析生日的月和日
  const [birthMonth, birthDay] = birthday.split('-').map(Number)
  
  // 计算第一年的生日
  let firstBirthday = new Date(meeting.getFullYear(), birthMonth - 1, birthDay)
  
  // 如果认识日期在当年生日之后，则从下一年开始计算
  if (meeting > firstBirthday) {
    firstBirthday.setFullYear(firstBirthday.getFullYear() + 1)
  }
  
  // 如果第一年的生日已经超过今天，则还没有过任何生日
  if (firstBirthday > today) {
    return 0
  }
  
  // 计算当前年份的生日
  let currentBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDay)
  
  // 如果今年的生日还没过，则使用去年的生日
  if (currentBirthday > today) {
    currentBirthday.setFullYear(currentBirthday.getFullYear() - 1)
  }
  
  // 计算生日次数（从第一次生日到当前生日的年数差）
  const birthdayCount = currentBirthday.getFullYear() - firstBirthday.getFullYear() + 1
  
  return birthdayCount
}