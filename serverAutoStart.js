const {
    spawn
} = require('child_process');
const fs = require('fs');
const treeKill = require('tree-kill');

//自动重启服务器
(function () {

    let subPid = 0,
        restart = () => {
            var child = spawn('yarn', ['server-dev']);
            subPid = child.pid;
        }

    let serverTimeout = null;

    fs.watch('./server', {
        recursive: true
    }, (eventType, filename) => {
        console.log('************文件改变**************' + filename);

        clearTimeout(serverTimeout);

        serverTimeout = setTimeout(() => {
            treeKill(subPid, 'SIGKILL', (err) => {
                subPid = 0;
                restart();
            });
        }, 500);
    });

    restart();
    
})();