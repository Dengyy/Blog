const mrs = [];

const getMaster = (data) => {
  return data.filter(item => {
    return item.target_branch === 'master'
  });
}

const getMergeBySelf = (data) => {
  return data.filter(item => {
    return item.target_branch !== 'master'
      && item.author.name === item.merged_by.name;
  });
}

const getReleasePush = (data) => {
    return data.filter(item => {
      return item.target_branch !== 'master'
        && item.author.name === item.merged_by.name;
    });
  }

const getHtmlList = (data) => {
  return `${data.length}: </h3>
    <div>` + data.map(item => {
      return `
        <p><a href="${item.web_url}">${item.iid} ${item.title}</a></p>
      `;
    }).join('') + `</div>`
}

const msg = `
  <h3>MR 2 master
  ${getHtmlList(getMaster(mrs))}
  <h3>自己合并
  ${getHtmlList(getMergeBySelf(mrs))}
  <h3>release push
  ${getHtmlList(getMergeBySelf(mrs))}
`
$('#brief').html(`
  <p>截止${new Date().toLocaleString()}</p>
  <p>gs10 MR 总量: ${mrs.length}</p>
`);
$('#container').html(msg).accordion();