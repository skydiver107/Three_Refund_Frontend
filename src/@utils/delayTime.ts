const delayTime = (ms: number) => new Promise(res => setTimeout(res, ms));

export default delayTime;