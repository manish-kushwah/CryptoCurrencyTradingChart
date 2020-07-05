import { createChart } from "lightweight-charts";

const url = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000`;

const chartProperties = {
  width: 1080,
  height: 570,
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
  },
  handleScale: {
    axisPressedMouseMove: true,
    mouseWheel: true,
    pinch: true,
  },
};

const chart = createChart(document.body, chartProperties);
const candlestickSeries = chart.addCandlestickSeries();

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const cdata = data.map((d) => {
      return {
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      };
    });
    candlestickSeries.setData(cdata);
  })
  .catch((err) => console.log(err));

// Dynamic data fetching
var socket = require("socket.io-client")("http://127.0.0.1:4000/");
socket.on("KLINE", (realtimeData) => {
  candlestickSeries.update(realtimeData);
});

export default candlestickSeries;
