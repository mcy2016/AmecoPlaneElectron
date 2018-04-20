'use strict'

// import {app, BrowserWindow, Menu, Screen} from 'electron'
const electron = require('electron')
const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = electron
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// global.sharedDataObject = {
//   searchBoxVisible: true
// }
let mainWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    height,
    // useContentSize: true,
    width
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  globalShortcut.register('CommandOrControl+Alt+L', function () {
    console.log('2222')
  })
}

app.on('ready', createWindow)

const template = [
  // {
  //   label: '编辑',
  //   submenu: [
  //     {role: '查看'},
  //     {role: 'redo'},
  //     {type: 'separator'},
  //     {role: 'cut'},
  //     {role: 'copy'},
  //     {role: 'paste'},
  //     {role: 'pasteandmatchstyle'},
  //     {role: 'delete'},
  //     {role: 'selectall'}
  //   ]
  // },
  {
    label: '显示',
    submenu: [
      {
        label: '重载',
        role: 'reload',
        accelerator: 'F5'
      },
      {
        label: '深度刷新',
        role: 'forcereload',
        accelerator: 'Ctrl+F5'
      },
      {role: 'toggledevtools'},
      {type: 'separator'},
      {
        label: '重置缩放',
        role: 'resetzoom',
        accelerator: 'Ctrl+0'
      },
      {
        label: '缩小',
        role: 'zoomin',
        accelerator: 'Ctrl+-'
      },
      {
        label: '放大',
        role: 'zoomout',
        accelerator: 'Ctrl+='
      },
      {type: 'separator'},
      {
        label: '全屏',
        role: 'togglefullscreen',
        accelerator: 'Ctrl+F11'
      },
      {
        label: '显示/隐藏',
        accelerator: 'F4',
        click () {
          console.log(111111)
        }
      }
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        role: 'minimize'
      },
      {
        label: '关闭',
        role: 'close'
      }
    ]
  },
  {
    label: '通用查询',
    submenu: [
      {
        label: '打卡系统',
        accelerator: 'F3',
        click () {
          const {width, height} = electron.screen.getPrimaryDisplay().size
          let cardWin = new BrowserWindow({width, height})
          cardWin.on('closed', () => {
            cardWin = null
          })
          const userCardPath = process.env.NODE_ENV === 'development'
            ? 'http://localhost:9080/#/card'
            : `file://${__dirname}/index.html#card`
          cardWin.loadURL(userCardPath)
        }
      },
      {
        label: '值班信息',
        accelerator: 'F8',
        click () {
          const {width, height} = electron.screen.getPrimaryDisplay().size
          let dutyWin = new BrowserWindow({width, height, frame: false})
          dutyWin.on('closed', () => {
            dutyWin = null
          })
          const userDutyPath = process.env.NODE_ENV === 'development'
            ? 'http://localhost:9080/#/duty/meal'
            : `file://${__dirname}/index.html#duty/meal`
          dutyWin.loadURL(userDutyPath)
        }
      },
      {type: 'separator'},
      {
        label: '数据中心',
        accelerator: 'Ctrl+D',
        click () {
          // const {width, height} = electron.screen.getPrimaryDisplay().size
          let dataCenterwin = new BrowserWindow({width: 800, height: 600, frame: false})
          // TODO 需要清空标题栏
          dataCenterwin.on('closed', () => {
            dataCenterwin = null
          })
          const dataCenterPath = process.env.NODE_ENV === 'development'
            ? 'http://localhost:9080/#/data-center/flight-time'
            : `file://${__dirname}/index.html#data-center/flight-time`
          dataCenterwin.loadURL(dataCenterPath)
        }
      },
      {
        label: '航班信息',
        click () {
          const {width, height} = electron.screen.getPrimaryDisplay().size
          let win = new BrowserWindow({width, height})
          win.on('closed', () => {
            win = null
          })
          win.loadURL('http://172.18.161.10/plane/#')
        }
      }
    ]
  },
  // {
  //   label: '客户端选择',
  //   acceptCharset: 'F3',
  //   submenu: [
  //     {
  //       label: '航线端',
  //       accelerator: 'Ctrl+H',
  //       click () {
  //         const {width, height} = electron.screen.getPrimaryDisplay().size
  //         let mccWin = new BrowserWindow({width, height})
  //         mccWin.on('closed', () => {
  //           mccWin = null
  //         })
  //         mccWin.loadURL(`file://${__dirname}/index.html`)
  //       }
  //     }
  //   ]
  // },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '学习更多',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 打开导出数据页面窗口
ipcMain.on('exportPage', function (e) {
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/excel'
    : `file://${__dirname}/index.html#excel`
  let exportWin = new BrowserWindow({
    width: 1024,
    height: 724,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })
  exportWin.on('close', function () {
    exportWin = null
  })
  exportWin.loadURL(modalPath)
})

// TODO 打开值班人员信息、用餐等页面 暂时没用
ipcMain.on('dutyPage', function (e) {
  const {width, height} = electron.screen.getPrimaryDisplay().size
  const dutyPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/duty/meal'
    : `file://${__dirname}/index.html#duty/meal`
  let DutyWin = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })
  DutyWin.on('close', function () {
    DutyWin = null
  })
  DutyWin.loadURL(dutyPath)
})

// TODO 打开数据中页面 暂时没用
ipcMain.on('dataCenterPage', function (e) {
  const {width, height} = electron.screen.getPrimaryDisplay().size
  const dutyPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/data-center'
    : `file://${__dirname}/index.html#data-center`
  let DataCenterWin = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })
  DataCenterWin.on('close', function () {
    DataCenterWin = null
  })
  DataCenterWin.loadURL(dutyPath)
})
