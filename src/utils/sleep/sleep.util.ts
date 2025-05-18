export const sleep = (ms: number = Math.floor(Math.random() * 1000)) =>
  new Promise(resolve => setTimeout(resolve, ms))
