import rawData from '../tmp/pushes.js'
import projects from '../tmp/projects.js'

const dom = document.getElementById("container1");
const myChart = echarts.init(dom);



const projectNames = {}
projects.forEach(p => {
    projectNames[p.id] = p.name
})

const dataObj = {};

rawData.forEach(obj => {
    const commit_title = obj['push_data']['commit_title']
    if (commit_title && !commit_title.startsWith('Merge')) {
        const projectName = projectNames[obj['project_id']]
        dataObj[projectName] = dataObj[projectName] || {}

        const date = obj['created_at'].slice(0, 7)
        dataObj[projectName][date] = dataObj[projectName][date] || {}

        dataObj[projectName][date][commit_title] = true
    }
});



const getHslColor = (i, j = 0, k = 0) => {
    return `hsl(${i * 360}, ${j ? j * 70 : 75}%, ${k ? k * 70 : 49}%, 1)`
}

const dataKeys = Object.keys(dataObj)
const iL = dataKeys.length
const data = dataKeys.map((projectKey, i) => {
    const projectKeys = Object.keys(dataObj[projectKey])
    const jL = projectKeys.length
    const children1 = projectKeys.map((dateKey, j) => {
        const dateKeys = Object.keys(dataObj[projectKey][dateKey])
        const kL = dateKeys.length
        const children2 = dateKeys.map((commit_title, k) => {
            return {
                name: commit_title,
                value: 1,
                itemStyle: {
                    color: getHslColor((i + 1) / iL, (j + 1) / jL, (k + 1) / kL)
                }
            }
        })

        return Object.assign({
            name: `${dateKey}: ${kL}`,
            itemStyle: {
                color: getHslColor((i + 1) / iL, (j + 1) / jL)
            }
        }, kL ? {
            children: children2
        } : {
            value: 1
        })
    })

    return Object.assign({
        name: `${projectKey}`,
        itemStyle: {
            color: getHslColor((i + 1) / iL)
        }
    }, jL ? {
        children: children1
    } : {
        value: 1
    })
})

const option = {
    series: {
        type: 'sunburst',
        highlightPolicy: 'ancestor',
        data: data,
        radius: [0, '95%'],
        sort: null,
        levels: [{}, {
            r0: '15%',
            r: '35%',
            itemStyle: {
                borderWidth: 2
            },
            label: {
                rotate: 'tangential'
            }
        }, {
            r0: '35%',
            r: '70%',
            label: {
                align: 'right'
            }
        }, {
            r0: '70%',
            r: '72%',
            label: {
                position: 'outside',
                padding: 3,
                silent: false
            },
            itemStyle: {
                borderWidth: 3
            }
        }]
    }
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}