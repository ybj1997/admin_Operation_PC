import qing from './images/晴 .png'
import duoyun from './images/多云.png'
import yin from './images/阴.png'
import xiaoyu from './images/小雨.png'

const weatherConfig = [
    {
        weather: '晴',
        img: qing
    },
    {
        weather: '多云',
        img: duoyun
    },
    {
        weather: '阴',
        img: yin
    },
    {
        weather: '小雨',
        img: xiaoyu
    }
]

function weatherImg(weaType) {
    const findWeather = weatherConfig.find(item => item.weather === weaType);
    if (findWeather) {
        return (
            <img src={findWeather.img} alt={findWeather.weather} />
        )
    } else {
        return (
            <img src={qing} alt="qing" />
        )
    }
}

export default weatherImg;


