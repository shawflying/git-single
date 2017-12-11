const execSync = require('child_process').execSync
const fs = require('fs');
const del = require('del');

const cmd1 = 'git init';
var cmd2 = 'git remote add -f origin ';
const cmd3 = 'git config core.sparsecheckout true';
const cmd4 = 'git pull origin master';

var Path = '';
process.stdin.setEncoding('utf8');
//请求
del(['./.git']).then(paths => {
    console.log('清理.git目录');
});

//打印入参信息
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

process.stdout.write('请输入仓库远程地址:\n');
process.stdin.on('data', (data) => {
    //todo 校验git 库
    if (data.indexOf("https://") > -1) {
        cmd2 += data;
        process.stdout.write('请输入想要复制的文件路径？多个路径都用空格分开:\n');
    } else {
        //获取请求入参数
        var list = data.split(' ');
        Path = list.join('\n');
        process.stdin.emit('end');
    }
});



process.stdin.on('end', () => {
    execSync(cmd1);
    execSync(cmd2);
    execSync(cmd3);

    fs.writeFileSync('./.git/info/sparse-checkout', Path);
    execSync(cmd4)
    console.log('It\'s ok!')
});