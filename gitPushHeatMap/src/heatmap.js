import rawData from '../tmp/pushes.js'
import projects from '../tmp/projects.js'
import './sunburst.js'

const dom = document.getElementById("container");
const myChart = echarts.init(dom);

const dataObj = {};
const xArr = [];
const yArr = [];

const projectNames = {}
projects.forEach(p => {
    projectNames[p.id] = p.name
})

rawData.forEach(obj => {
    const x = obj['created_at'].slice(0, 10)
    let xI = xArr.indexOf(x);
    if (xI < 0) {
        xArr.push(x)
        xI = xArr.indexOf(x);
    }
    const y = projectNames[obj['project_id']]
    let yI = yArr.indexOf(y);
    if (yI < 0) {
        yArr.push(y)
        yI = yArr.indexOf(y);
    }

    const key = `${xI}-${yI}`
    dataObj[key] = dataObj[key] || {
        x,
        y,
        commit_title: []
    }
    dataObj[key].commit_title.push(obj['push_data']['commit_title'])
});

const scatterData = [];

const data = Object.keys(dataObj).map(k => {
    const res = k.split('-').map(s => +s)
    const commits = dataObj[k].commit_title.filter(msg => !(msg || '').startsWith('Merge'))
    res.push(commits.length)
    scatterData.push([...res, commits.join('<br>')])
    return res
})

const option = {
    tooltip: {
        position: 'top',
        formatter: function (params) {
            const k = params.value[0] + '-' + params.value[1]
            const data = dataObj[k]
            return data.x + ' ' + data.y + ': ' + params.value[2] + '<br>' + data.commit_title.join('<br>')
        },
        alwaysShowContent: true
    },
    animation: false,
    xAxis: {
        type: 'category',
        data: xArr,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: yArr,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: '提交信息',
        type: 'heatmap',
        data: data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}